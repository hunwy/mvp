import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import ppsService from '../services/pps-service';

const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


class WalletWithdraw extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:"",
      Address:"",
      Size:1,
      withdrawlist:[],
      ppsDeposited:0,
      statetype:'To be audited',
      languagelist:{},
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delelist = this.delelist.bind(this);
    this.Withdraw = this.Withdraw.bind(this);


  }

  componentDidMount() {
    var languageActive = localStorage.getItem('language')
    for (var item in localeList) {
        if(item == languageActive){
            var languagelist = localeList[item];
        }
    }
    this.setState({
        state:this.state.languagelist=languagelist
    });


    this.setState({ Address: window.address });

    ppsService.getDepositBalance(window.address)
     .then((data)=>{
        this.setState({ ppsDeposited : data.data.balance});
     });
    
    this.withdrawlist();

  }

  withdrawlist(){
    ppsService.getWithdrawInfo(window.address).then((data)=>{
      console.log(data.data);
      this.setState({withdrawlist:data.data})
    });
  }

  Submit(){
    if(this.state.Address != "" || this.state.Size >1){
      var withdrawlist = this.state.withdrawlist;
      withdrawlist.push({
          account:this.state.Address,
          size:this.state.Size,
          state:0,
          id:'...',
      })
      this.setState({withdrawlist:withdrawlist,Address:window.address,Size:1})
      ppsService.applyWithdraw(this.state.Address,this.state.Size);

    }
    this.timerID = setTimeout(
      () => this.withdrawlist(),
      1000
    );
    
  }

  delelist(index){
    this.setState({
        withdrawlist: this.state.withdrawlist.filter((elem, i) => index != i)
    });

    var deleId = this.state.withdrawlist[index].id;
    ppsService.deleWithdraw(deleId).then((data)=>{
      console.log(data);
    });


  }

  Withdraw(index){

  }

  openModal() {
    this.setState({modalIsOpen: true});

    this.withdrawlist();
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }


  Size(e){
    if (Number(e.target.value) >= Number(this.state.ppsDeposited)){
      this.setState({Size:this.state.ppsDeposited})
    }else{
      this.setState({Size:e.target.value})
    }
  }


  render() {
      const language = this.state.languagelist;
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>{language.Withdraw}</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="withdraw">
            <h2 ref={subtitle => this.subtitle = subtitle}>{language.Withdraw_PPS}</h2>
            <div className="tablebox">
              <table className={this.state.withdrawlist.length == 0 ? "hide table" : "table" }>
                <tr>
                    <th>{language.Address}</th>
                    <th>{language.Size}</th>
                    <th>{language.TX}</th>
                    <th>{language.Status}</th>
                    <th>{language.Operation}</th>
                </tr>
                {this.state.withdrawlist.map((item,index) => (
                  <tr>
                    <td className="td1"><input type="text" value={item.account} readonly /></td>
                    <td className="td2">{item.size}</td>
                    <td className="td3"><input type="text" value={item.id} readonly /></td>
                    <td className="td4">
                        {item.state == 0 ? "Apply for money" : ""}
                        {item.state == 1 ? "In the coin" : ""}
                        {item.state == 2 ? "Finish the coin" : ""}
                        {item.state == -1 ? "Currency failure" : ""}
                    </td>
                    <td className="td5"><button className="Left"  onClick={this.Withdraw.bind(this,index)} >Withdraw</button><button className="Right" onClick={this.delelist.bind(this,index)}>Cancel</button></td>
                  </tr>  
                  ))
                }
              </table>
            </div>
            <div className="row submitbox">
                <div className="form-group col-lg-6">
                  <label>{language.Address}</label>
                  <input type="text"  className="form-control" placeholder={language.Wallet_Account} value={this.state.Address} onChange={(e) => this.setState({Address: e.target.value})} />
                </div>
                <div className="form-group col-lg-6">
                  <label>{language.Size}</label>
                  <input type="number"  className="form-control" placeholder={language.Wallet_Size} value={this.state.Size} onChange={(e) => this.Size(e)} />
                </div>
            </div>
            <button className="Left" onClick={(e)=>this.Submit(e)}>{language.Submit}</button>
            <button className="Right" onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletWithdraw
