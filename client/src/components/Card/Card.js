import React, {Component} from 'react';

import Modal from '../Modal/Modal';

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
        // footer="This is footer. Buttons can be here."
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
              <div className="Card-Img">
                <img src={this.props.img}/>
              </div>
              <div className="Card-Content">
                <h2>{this.props.name}</h2>
                <p>Category: {this.props.category}</p>
                <p>Location: {this.props.location}</p>
                <p>Description: {this.props.description}</p>
                <p>Contact Information: {this.props.contact}</p>
              </div>
            <button style={buttonStyle} onClick={this.openModalHander}>Detail</button>
            </div>

      </React.Fragment>
          );
  }
}

export default Card;
