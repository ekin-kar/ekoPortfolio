import React from "react";
import styles from "./modal.module.css";

const Modal = ({ isOpen, onClose }) => {
  const handleModalClose = () => {
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>ADD A NEW PURCHASE</h2>
              <button onClick={handleModalClose} className={styles.closeBtn}>
                x
              </button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.body}>
              <div className={styles.formContainer}>
                <select className={styles.select}>
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Text Input 1"
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Text Input 2"
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Text Input 3"
                />
              </div>
            </div>
            <div className={styles.footer}>
              <button className={styles.button}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
