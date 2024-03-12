import React, { useState } from "react";
import styles from "./coinSearch.module.css";
import { coins } from "@/lib/data";
import { useRouter } from "next/navigation";

const CoinSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCoinClick = (coin) => {
    router.push(`/portfolio/${coin.symbol.toUpperCase()}`);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          name="CoinName"
          placeholder="Search coin..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.coinListContainer}>
        <ul className={styles.coinList}>
          {filteredCoins.map((coin) => (
            <li key={coin.symbol} onClick={() => handleCoinClick(coin)}>
              {coin.name} - {coin.symbol}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoinSearch;
