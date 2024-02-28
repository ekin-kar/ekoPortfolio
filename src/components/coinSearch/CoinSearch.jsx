import React, { useState } from "react";
import styles from "./coinSearch.module.css";

const CoinSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");

  const coins = [
    {
      id: 1,
      name: "Bitcoin",
      amount: 1,
      symbol: "BTC",
      price: 50000,
      change: 0.5,
      img: "/btc.png",
    },
    {
      id: 2,
      name: "Ethereum",
      amount: 10,
      symbol: "ETH",
      price: 2000,
      change: 1,
      img: "/eth.png",
    },
    {
      id: 3,
      name: "Cardano",
      amount: 500,
      symbol: "ADA",
      price: 2,
      change: 2,
      img: "/ada.png",
    },
    {
      id: 4,
      name: "Polkadot",
      amount: 100,
      symbol: "DOT",
      price: 30,
      change: 3.6,
      img: "/dot.png",
    },
    {
      id: 5,
      name: "Chainlink",
      amount: 60,
      symbol: "LINK",
      price: 30,
      change: -4,
      img: "/link.png",
    },
    {
      id: 6,
      name: "Litecoin",
      amount: 5,
      symbol: "LTC",
      price: 200,
      change: 0.5,
      img: "/ltc.png",
    },
    {
      id: 7,
      name: "Stellar",
      amount: 1000,
      symbol: "XLM",
      price: 0.5,
      change: 0.5,
      img: "/xlm.png",
    },
    {
      id: 8,
      name: "Uniswap",
      amount: 20,
      symbol: "UNI",
      price: 30,
      change: 0.5,
      img: "/uni.png",
    },
    {
      id: 9,
      name: "Aave",
      amount: 5,
      symbol: "AAVE",
      price: 300,
      change: 0.5,
      img: "/aave.png",
    },
    {
      id: 10,
      name: "Avalanche",
      amount: 10,
      symbol: "AVAX",
      price: 50,
      change: 0.5,
      img: "/avax.png",
    },
  ];

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
