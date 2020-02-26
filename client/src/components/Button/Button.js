import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

// Provide <a href=? >, <Link to=? > routing, <button onClick=? >
const Button = props => {
  // If href is defined, return <a> tag with href attribute
  if (props.href) {
    return ( 
      <a 
        className={`button button--${props.size || 'default'} ${props.inverse &&
        'button--inverse'} ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a> 
    );
  };
  // Page routing button by Link
  if (props.linkTo) {
    return (
      <Link
        to={props.linkTo}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  // Return <button> tag
  return (
      <button 
        className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${props.danger && 'button--warn'} `}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
  );
};

export default Button;