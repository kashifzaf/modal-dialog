import React, { useState } from 'react';
import Modal from './common/components/Modal/Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <button aria-label="Click button to show modal" onClick={handleOpenModal}>Show Modal Magic</button>
      {/* Ideally, we should use translation tokens instead of text
          to add multi language support
      */}
      {isModalOpen && (
        <Modal 
          header="Credit Rating"
          onClose={handleModalClose}
        >
            <p>Congratulations on achieving an A star credit rating. As a result, you have been granted a cash prize.</p>
        </Modal>
      )}
    </div>
  );
};

export default App;
