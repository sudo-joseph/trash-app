import React, { useState } from 'react';

import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import './MaterialsList.css';

const MaterialsList = props => {
  const [showDetails, setShowDetails] = useState(false);

  const openDetailsHander = () => setShowDetails(true);
  const closeDetailsHander = () => setShowDetails(false);

  return (
    <React.Fragment>
      <Modal 
        show={showDetails} 
        onCancel={closeDetailsHander} 
        header="This is header"
        //footer="This is footer. Buttons can be here."
        footer={<>
          <Button inverse onClick={() => alert("Clicked")}>Default</Button>
          <Button to={`/places/${props.id}`}>Link Btn</Button>
          <Button href="http://google.com">Google</Button>
          <Button danger onClick={() => alert("Warning!!!")}>Warning</Button>
        </>}
      >
        <div>
           <h2>Detail Description</h2>
           <p>Detail Description paragraph?</p>
        </div>
      </Modal>
      <div className={`materials center ${props.materialsClass}`}>
        <h1>Materials List</h1>
        <div>
          <button onClick={openDetailsHander}>Card</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MaterialsList;