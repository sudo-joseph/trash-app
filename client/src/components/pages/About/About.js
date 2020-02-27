import React, { Component } from 'react';
import './About.css';
import aboutPhoto from "../../../images/water-droplet.svg";

class About extends Component {
  render() {
    return (
      <div className="Container">
        <div className="About">
          <img src={aboutPhoto} alt="desc"/>
          <article>
            <h1>About NoTrash</h1>
            <p>Ready to responsibly dispose of something, but not sure where to take it?
              Trash app is the way to go! </p>
            <p>Type in the item(s) you want to dispose of and get a list of places in your area to help plan your trip.</p>
            <p>Want to know if your item(s) be accepted before you leave the house? Save yourself some time and contact services and facilities by their listing information. Trash app allows users to keep that spring cleaning momentum by quickly finding places for their unused items.</p>
            <h3>Being Green</h3>
            <p>We are conscious of our environment and the different ways to keep it clean - clean from trash and debris, but most importantly, hazardous things that could leech into the environment or contaminate.</p>
            <p>Maybe you want to do the right thing and dispose of something that may be beyond the household recycling bin or isn’t gonna fit in you trash can.</p>
            <p>Let’s say you are ready to go take care of it, but you don’t know where to go.</p>
            <p>Don’t let that stop you anymore. </p>
        </article>
        </div>
      </div>
    );
  }
}
export default About;
