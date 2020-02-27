import React, {Component} from 'react';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import './Card.css';


class Card extends Component {

  state = { facility: {},
            showModal: false
          };
  
  location_id = this.props.facility.location_id;

  /////// Fetch Data ///////
  fetchFacilityDetails = () => {
    //Fetches facilities that can service user selcted facility on this card
    let url = `http://localhost:8080/api/facilities/earth911/facilities/${this.location_id}`

    fetch(url,{})
      .then((response) => {
        return response.json();
      })
      .then((facility_data) => {
        this.setState({ facility: facility_data.results.result[this.location_id]});
      })
      .then(() => {
       if (this.state.facility) {
        this.setState({ showModal: true});
       } else {
         console.log("this.state.facility is still null")
       }
      });
  }

  openModalHander = (event) => {
    this.fetchFacilityDetails();
  }

  closeModalHandler = (event) => {
    this.setState({showModal: false});
  }
 
  render() {
    const buttonStyle = {
      background: "#a8c1c5",
    };

    return (
      <React.Fragment>
        <Modal 
        show={this.state.showModal} 
        onCancel={this.closeModalHandler} 
        header={this.state.facility.description}
        footerClass="modal__footer__button_right"
        footer={<Button onClick={this.closeModalHandler}>CLOSE</Button>}
      >
        <div>
          <ul style={{ listStyleType: "none" }}>
           <li><strong>Phone:</strong> {this.state.facility.phone}</li>
           <li><strong>Hours:</strong>  {this.state.facility.hours}</li>
           <li><strong>URL:</strong> {this.state.facility.url ? this.state.facility.url : "N/A"}</li>

          </ul>
           <p>Note: {this.state.facility.notes_public ? this.state.facility.notes_public : "N/A" }</p>
        </div>
       </Modal>
    <div className="Card"
                //  onMouseOver={() => this.props._onClickCard(this.props.facility)}>
                 onClick={() => this.props._onClickCard(this.props.facility)}>
              {/* <div className="Card-Img">
                <img src={this.props.img}/>
              </div> */}
      <div className="Card-Content">
        <div>
          <ul style={{ listStyleType: "none" }}>                
            <li>{this.props.name}</li>
            { this.props.distance && <li>Distance: {this.props.distance} miles</li> }
            { this.props.category && <li>Category: {this.props.category}</li> }
            { this.props.location && <li>Location: {this.props.location}</li> }
            { this.props.description && <li>Description: {this.props.description}</li> }
            { this.props.contact && <li>Contact Information: {this.props.contact}</li> }
          </ul>
        </div>
        <div style={{align: "right" }}>
          <Button center size="smaller" style={buttonStyle} onClick={this.openModalHander}>INFO</Button>
        </div>
      </div>
    </div>

      </React.Fragment>
          );
  }
}

export default Card;
