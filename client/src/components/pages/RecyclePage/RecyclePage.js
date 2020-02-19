import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './RecyclePage.css';
class RecyclePage extends Component {
  render() {
    return (
      <div className="RecyclePage">
        <header className="RecyclePage-header">
          <p>
            Kickstart Coding - Frontend React<br />
            MERN Starter Project
          </p>
          <Link to="/blog/">Blog</Link>
          <Link to="/write/">Write article</Link>
        </header>
      </div>
    );
  }
}

export default RecyclePage;
