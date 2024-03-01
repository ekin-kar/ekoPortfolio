import React, { useState } from "react";
import styles from "./modal.module.css";
import CoinSearch from "../coinSearch/CoinSearch";
import { newTransaction } from "@/lib/actions";

const Modal = ({ isOpen, onClose }) => {
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  const handleSelectedCoin = (coinId) => {
    setSelectedCoinId(coinId);
  };
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
          <form className={styles.form} action={newTransaction}>
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
                  <CoinSearch onSelectedCoin={handleSelectedCoin} />
                  <div className={styles.inputs}>
                    <div className={styles.inputContainer}>
                      <label className={styles.label} htmlFor="price">
                        Price:
                      </label>
                      <input
                        name="coin"
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
                        name="quantity"
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
                      name="notes"
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
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
