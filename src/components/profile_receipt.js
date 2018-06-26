import React from 'react';
import ReactDOM from 'react-dom';
import languageService from '../services/language-service';

class Receipt extends React.Component {
  constructor() {
    super();

    this.state = {
      languagelist:{}
    };


    languageService.language();
  }


  
  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
  }

  render() {
      const language = this.state.languagelist;
    return (

      <div className="Receipt">
          <div className="box1"><p className="Left"><span></span>{language.To_Itinerary}</p><p className="Right">{language.Print}</p></div>
          <h3>{language.Confirmed}: 7 {language.nights} in Melbourne, Australia</h3>
          <div className="box2">
              <p className="Left">Booked by <b>Christie Zhong</b> Wednesday, 5 Jul 2017</p>
              <p className="Right"><b>{language.order_number}</b> HMFTDP9Q48</p>
          </div>
          <div className="box3">
            <div className="box4 col-sm-5 col-md-5 col-lg-5">
              <div className="box4_1">
                <p className="Left">{language.Check_In}</p>
                <p className="Right">{language.Check_Out}</p>
              </div>
              <div className="box4_2 row">
                <p className="col-sm-4 col-md-4 col-lg-4">26 Aug 2017</p>
                <p className="col-sm-4 col-md-4 col-lg-4 text-center"><span></span><span></span><span></span></p>
                <p className="col-sm-4 col-md-4 col-lg-4 text-right">26 Aug 2017</p>
              </div>
              <div className="box4_3 row">
                <h4>Entire home/apt</h4>
                <p>Absolute Melbourne Center Apartment</p>
                <p>Swanston Street Apartment 506</p>
                <p>Melbourne, VIC 3000</p>
                <p>Australia</p>
                <br/><br/>
                <p>Hosted by Mo Han</p>
                <p>Phone: +61 414 526 064</p>
              </div>
              <div className="box4_4 row">
                <h4>3 {language.Travellers_on_this_trip}</h4>
                <div className="userlist">
                  <div><img src="/images/uesrimg.png" /></div>
                  <p>user</p>
                </div>
              </div>
            </div>
            <div className="box5 col-sm-7 col-md-7 col-lg-7">
              <div className="box5_top">
                  <h3>{language.Charges}</h3>
                  <ul>
                    <li>
                      <p className="Left">$139.91 SGD  7 {language.nights}</p>
                      <p className="Right">$ 979.35 SGD</p>
                    </li>
                    <li>
                      <p className="Left">{language.Cleaning_fees}</p>
                      <p className="Right">$ 38.38 SGD</p>
                    </li>
                    <li>
                      <p className="Left">{language.Service_fees}</p>
                      <p className="Right">$ 119.40 SGD</p>
                    </li>
                  </ul>
                  <button><span className="Left">{language.Total}</span><span className="Right">$ 1137.13 SGD</span></button>
              </div>
              <div className="box5_bottom">
                  <h3>{language.Payment}</h3>
                  <ul>
                    <li>
                      <p className="Left">Paid with MASTERCARD •••• 9121</p>
                      <p className="Right">$ 1136.00 SGD</p>
                    </li>
                    <li>
                      <p className="Left">Wed, July 05, 2017 @ 10:12 AM +08</p>
                    </li>
                    <li>
                      <h4 className="Left">{language.Total_Remaining}</h4>
                      <h4 className="Right">$1.13 SGD</h4>
                    </li>
                  </ul>
                  <span className="Adddetails">{language.Add_billing_details}</span>
              </div>
            </div>
          </div>

          <div className="box6">
              <h4>{language.Cost_per_traveler}</h4>
              <p>{language.This_trip_was} <b>$54.15 SGD</b> {language.per_person_per_night},</p>
              <p>{language.including_taxes_and_other_fees}.</p>
          </div>

          <div className="box7">
            <ul>
              <li>
                <h4 className="Left">{language.Need_help}?</h4>
                <p className="Right">HMFTDP9Q48</p>
              </li>
              <li>
                <p className="Left">{language.Visit_the} <span>{language.Help_Center}</span> {language.for_any_questions}.</p>
                <p className="Right">{language.Booked_by} <b>Christie Zhong</b></p>
              </li>
              <li>
                <p className="Right">Wednesday, 5 Jul 2017</p>
              </li>
            </ul>
          </div>
          <div className="box8">
            <p>{language.Cancellation_policy}: <span>{language.Strict}</span>. {language.Certain_fees_and_taxes_may_be_nonrefundable}.</p>
            <p>{language.conversion_fee_was_applied_to_this_booking}.</p>
            <p>{language.PopulStay_Payments_UK_Ltd_is_a_limited_collection_agent_of_your_Host} <span> <a href="https://www.PopulStay.com.sg/terms"> https://www.PopulStay.com.sg/terms </a>。</span> {language.Questions_or_complaints_contact_Airbnb_Payments}</p>
            <br/>
            <p>{language.Payment_processed_by}:</p>
            <p>{language.PopulStay_Payments_UK_Ltd}.</p>
            <p>{language.ComptonSt}.</p>
            <p>{language.London}</p>
            <p>{language.EC1V_0AP}</p>
            <p>{language.United_Kingdom}</p>
            <br/>
            <p>{language.PopulStay_Ireland_UC}</p>
            <p>{language.The_Watermarque_Building}</p>
            <p>{language.South_Lotts_Road}</p>
            <p>{language.Ringsend_Dublin4}</p>
            <p>{language.Ireland}</p>
            <p>{language.VAT_NumberIE9827384L}</p>
            <img src="/images/logo_grey.png" />
          </div>
      </div>
    );
  }
}
export default Receipt