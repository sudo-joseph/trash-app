import React, {Component} from 'react';

import Button from '../Button/Button';
import './Card.css';


class Card extends Component {

  render() {
    const buttonStyle = {
      background: "#a8c1c5",
    };

    return (
      <React.Fragment>

    <div className="Card"
                //  onMouseOver={() => this.props._onClickCard(this.props.facility)}>
                 onClick={() => this.props._onClickCard(this.props.facility)}>
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
          <Button center size="smaller"
                  style={buttonStyle}
                  onClick={(location_id) => this.props.openModalHander(this.props.facility.location_id)}
                  >INFO</Button>
        </div>
      </div>
    </div>

      </React.Fragment>
          );
  }
}

export default Card;
