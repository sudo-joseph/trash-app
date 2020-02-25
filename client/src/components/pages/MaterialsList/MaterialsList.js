import React from 'react';

import './MaterialsList.css';

const Materials = props => {
  return (
    <div className={`materials ${props.materialsClass}`}>
      <h1>Materials List</h1>
    </div>
  );
}

export default Materials;