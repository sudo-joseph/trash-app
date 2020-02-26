import React, { Component } from 'react';
import './Materials.css';
import materialsPhoto from "../../../images/water-droplet.svg";

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
            <p>What we do</p>
            <p>Camembert de normandie jarlsberg camembert de normandie. Melted cheese cheese slices chalk and cheese mozzarella stilton port-salut feta danish fontina. Parmesan danish fontina fromage frais cheesy feet port-salut halloumi hard cheese stinking bishop. Fromage goat.</p>
            <p>Cheese on toast croque monsieur airedale. Cream cheese cow cow everyone loves who moved my cheese halloumi pecorino rubber cheese. Paneer cottage cheese cheese slices boursin bocconcini bocconcini monterey jack blue castello. Bavarian bergkase caerphilly mascarpone gouda parmesan fondue airedale parmesan. Bavarian bergkase port-salut mozzarella ricotta fromage frais roquefort who moved my cheese bocconcini. Bavarian bergkase rubber cheese squirty cheese manchego fromage frais babybel cheese strings say cheese. Rubber cheese gouda cheese and biscuits cheese on toast pepper jack squirty cheese brie cheddar. Cheesy feet gouda fromage frais goat mozzarella st. agur blue cheese cheese on toast paneer. Babybel.</p>
            <p>Cheese on toast croque monsieur airedale. Cream cheese cow cow everyone loves who moved my cheese halloumi pecorino rubber cheese. Paneer cottage cheese cheese slices boursin bocconcini bocconcini monterey jack blue castello. Bavarian bergkase caerphilly mascarpone gouda parmesan fondue airedale parmesan. Bavarian bergkase port-salut mozzarella ricotta fromage frais roquefort who moved my cheese bocconcini. Bavarian bergkase rubber cheese squirty cheese manchego fromage frais babybel cheese strings say cheese. Rubber cheese gouda cheese and biscuits cheese on toast pepper jack squirty cheese brie cheddar. Cheesy feet gouda fromage frais goat mozzarella st. agur blue cheese cheese on toast paneer. Babybel.</p>
        </article>
        </div>
      </div>
    );
  }
}

export default Materials;
