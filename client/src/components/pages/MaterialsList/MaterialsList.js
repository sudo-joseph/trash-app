import React from 'react';

import Card from '../../Card/Card';
import './MaterialsList.css';

const MaterialsList = props => {
  return (
    <div className={`materials center ${props.materialsClass}`}>
      <h1>Materials List</h1>
      <div>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      </div>
    </div>
  );
}

export default MaterialsList;