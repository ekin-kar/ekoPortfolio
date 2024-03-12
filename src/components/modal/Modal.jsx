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
                <h2 className={styles.title}>Search for a coin</h2>
                <button onClick={handleModalClose} className={styles.closeBtn}>
                  x
                </button>
              </div>
              <hr className={styles.hr} />
              <div className={styles.body}>
                <div className={styles.formContainer}>
                  <CoinSearch onSelectedCoin={handleSelectedCoin} />
                  <div className={styles.inputs}></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
