import PopulStayToken   from '../../build/contracts/PopulStayToken.json';

var RentHouseListingAddress = "0x9fbda871d559710256a2502a2517b794b482db40";
var PPSAddress              = "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f";

class PPSService {
  static instance

  constructor() 
  {
    if (PPSService.instance) {
      return PPSService.instance
    }

    PPSService.instance = this;

    this.contract = require('truffle-contract');
    this.PPSContract = this.contract(PopulStayToken);
  }


    setPreOrder( hostaddress, totalTokens, uuid, from, to, days) {
      return new Promise((resolve, reject) => {
      this.PPSContract.setProvider(window.web3.currentProvider)
      window.web3.eth.getAccounts((error, accounts) => {
      this.PPSContract.at(PPSAddress)
      .then((instance) => {

      	console.log(RentHouseListingAddress+","+totalTokens+","+hostaddress+","+uuid+","+from+","+to+","+days);
          return instance.approveAndCall(
            RentHouseListingAddress,
            totalTokens,
            hostaddress,
            uuid,
            from,
            to,
            days,
            {from: accounts[0], gas: 876790})
            
          
        })
        .then((transactionReceipt) => {
          // Success
          resolve(transactionReceipt)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
      })
    })
  }


      waitTransactionFinished(transactionReceipt, pollIntervalMilliseconds=1000) {
    return new Promise((resolve, reject) => {
      let txCheckTimer = setInterval(txCheckTimerCallback, pollIntervalMilliseconds);
      function txCheckTimerCallback() {
        window.web3.eth.getTransaction(transactionReceipt, (error, transaction) => {
          if (transaction.blockNumber != null) {
            console.log(`Transaction mined at block ${transaction.blockNumber}`)
            console.log(transaction)
            clearInterval(txCheckTimer)
            setTimeout(()=>resolve(transaction.blockNumber), 2000)
          }
        })
      }
    })
  }



 }



  const ppsService = new PPSService()

export default ppsService