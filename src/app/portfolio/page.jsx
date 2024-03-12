"use client";
import React, { useState } from "react";
import Card from "@/components/card/Card";
import styles from "./portfolio.module.css";
import Table from "@/components/table/Table";
import Modal from "@/components/modal/Modal";

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalWorth, setTotalWorth] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleTotalWorthChange = (sum) => {
    setTotalWorth(sum);
  };

  return (
    <div className={styles.portfolio}>
      <h2 className={styles.title}>My Portfolio</h2>
      <div className={styles.wrapper}>
        <div className={styles.worthCard}>
          <p className={styles.worth}>Total Worth</p>
          <p className={styles.worthVal}>{totalWorth}$</p>
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.button}>Sync</button>
          <button className={styles.button} onClick={openModal}>
            Add New Coin
          </button>
        </div>
      </div>
      <Card>
        <Table onTotalWorthChange={handleTotalWorthChange} />
      </Card>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Portfolio;
