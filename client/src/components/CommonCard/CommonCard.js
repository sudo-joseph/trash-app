import React from 'react';

import './CommonCard.css';

const CommonCard = props => {
    return (
        <div className={`card-common ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
};

export default CommonCard;