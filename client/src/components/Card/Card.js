import React, {Component} from 'react';
import './Card.css';

class Card extends Component {
  render() {

    return (<div className="Card">
              <div className="Card-Img">
                <img src={this.props.img}/>
              </div>
              <div className="Card-Content">
                <h2>Service Center</h2>
                <p>Category: {this.props.category}</p>
                <p>Location: {this.props.location}</p>
                <p>Description: {this.props.description}</p>
                <p>Contact Information: {this.props.contact}</p>
              </div>
            </div>
          );
  }
}

export default Card;
