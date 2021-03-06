import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import ipfsService from '../services/ipfs-service'
import { Link } from 'react-router-dom'

class ListingCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      ipfsHash: null,
      lister: null,
      descriptioninfo:{},
      previewurl:""
    }
  }

  componentDidMount() {

    var ipfsHash = houselistingService.getIpfsHashFromBytes32(this.props.row.id);
    // houselistingService.getHouseInfoDetail(this.props.row)
    // .then((result) => {
    //     var roominfo = JSON.parse(result[4]);
    //     this.setState({price:result[0],category:roominfo.category,location:roominfo.location,beds:roominfo.beds});
    //     return 
    var roominfo = this.props.row.houseinfo;
    this.setState(
    {
      price:this.props.row.price,
      category:roominfo.category,
      location:roominfo.location,
      beds:roominfo.beds
    });
    ipfsService.getListing(ipfsHash)
        .then((result)=>{
          var descriptioninfo = JSON.parse(result);
         this.setState({descriptioninfo:descriptioninfo});
         if(descriptioninfo.selectedPictures && descriptioninfo.selectedPictures.length>0 && descriptioninfo.selectedPictures[0].imagePreviewUrl)
         {
          this.setState({previewurl:descriptioninfo.selectedPictures[0].imagePreviewUrl});
          console.log(this.state.previewurl);
         }

    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="col-12 col-md-6 col-lg-4 listing-card">
        <Link to={`/listing/${this.props.row.id}`}>
          <img className="photo" src={this.state.previewurl} role="presentation" />
          <div className="category">{this.state.category} ({this.state.beds} beds)</div>
          <div className="title">{this.state.location}</div>
          <div className="price">
              {Number(this.state.price).toLocaleString(undefined, {minimumFractionDigits: 3})} PPS / day
          </div>
        </Link>
        <br/><br/>
      </div>
    )
  }
}

export default ListingCard
