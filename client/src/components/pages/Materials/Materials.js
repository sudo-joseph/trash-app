import React, { Component } from 'react';
import './Materials.css';
import materialsPhoto from "../../../images/recycle-types.jpg";

class Materials extends Component {
  state = {
    someStateVar: [],
  }

  render() {
    return (
      <div className="Container">
        <div className="Materials">
          <img src={materialsPhoto} alt="desc"/>
          <article>
            <h1>Materials</h1>
            <h4>The categories listed in your search cover many types of materials and objects:</h4>
            <div>{this.props.itemCategories.map(item => (
              <div>{item.label}</div>
            ))}</div>
            
          </article>
        </div>
      </div>
    );
  }
}

export default Materials;
