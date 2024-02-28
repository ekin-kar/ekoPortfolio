import React from "react";
import styles from "./modal.module.css";
import CoinSearch from "../coinSearch/CoinSearch";

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
              <h2 className={styles.title}>ADD A NEW PURCHASE</h2>
              <button onClick={handleModalClose} className={styles.closeBtn}>
                x
              </button>
            </div>
            <hr className={styles.hr} />
            <div className={styles.body}>
              <div className={styles.formContainer}>
                <CoinSearch />
                <div className={styles.inputs}>
                  <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor="price">
                      Price:
                    </label>
                    <input
                      id="price"
                      className={styles.input}
                      type="number"
                      placeholder="Enter the price"
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor="quantity">
                      Quantity:
                    </label>
                    <input
                      id="quantity"
                      className={styles.input}
                      placeholder="Enter the quantity"
                      type="number"
                    />
                  </div>
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="notes">
                    Notes:
                  </label>
                  <textarea
                    id="notes"
                    className={styles.textarea}
                    type="text"
                    placeholder="Your notes..."
                  />
                </div>
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
