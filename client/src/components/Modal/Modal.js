import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

// Modal Internal Component(Not Shared)
const ModalOverlay = props => {
  // Keyboard shortcut: Esc key
  useEffect(() => {
    const keyListner = ev => {
      if (ev.keyCode === 27) {
        props.onCancel();
      }
    }
    document.addEventListener("keydown", keyListner);

    return () => document.removeEventListener("keydown", keyListner);
  }, []);

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      {/* Felexible form style block holds "div(body)" and "footer" */}
      <form onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
}

const Modal = props => {
  return (
   <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={600}
          classNames="modal" >
          <ModalOverlay {...props} />
      </CSSTransition>
  </React.Fragment>    
  );
};

export default Modal;