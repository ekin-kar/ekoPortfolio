import React, { useState } from "react";
import styles from "./coinSearch.module.css";
import { coins } from "@/lib/data";

const CoinSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCoin("");
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin.name);
    setSearchTerm("");
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = selectedCoin
    ? [
        coins.find((coin) => coin.name === selectedCoin),
        ...filteredCoins.filter((coin) => coin.name !== selectedCoin),
      ]
    : filteredCoins;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          name="CoinName"
          placeholder="Search coin..."
          value={selectedCoin ? selectedCoin : searchTerm}
          onChange={handleInputChange}
          onClick={() => setSelectedCoin("")}
        />
      </div>
      <div className={styles.coinListContainer}>
        <ul className={styles.coinList}>
          {sortedCoins.map((coin) => (
            <li
              key={coin.symbol}
              onClick={() => handleCoinClick(coin)}
              className={selectedCoin === coin.name ? styles.selectedCoin : ""}
            >
              {coin.name} - {coin.symbol}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoinSearch;
