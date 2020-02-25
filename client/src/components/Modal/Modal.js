import React from 'react';
import ReactDOM from 'react-dom';

improt './Modal.css';

// Modal Internal Component(Not Shared)
const ModayOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal_header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      {/* Felexible form style block holds "div(body)" and "footer" */}
      <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault}>
        <div className={`modal_content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal_footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hok'));
}

const Modal = props => {
    
};

export default Modal;