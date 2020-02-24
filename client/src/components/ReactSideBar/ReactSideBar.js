import React, { Component } from 'react';
import './ReactSideBar.css';



class ReactSideBar extends Component {
  render() {
    return (
      <div
        sidebar={this.props.sidebar}
        open={this.sidebarOpen}
        onSetOpen={this.onSetOpen}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
 
export default ReactSideBar;