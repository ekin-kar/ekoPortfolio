"use client";
import Image from "next/image";
import styles from "./table.module.css";
import { useState } from "react";

const initialCoinsData = [
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

const Table = () => {
  const [coinsData, setCoinsData] = useState(initialCoinsData);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortByColumn = (column) => {
    const sortedData = [...coinsData].sort((a, b) => {
      let valueA, valueB;

      switch (column) {
        case "name":
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case "amount":
          valueA = a.amount;
          valueB = b.amount;
          break;
        case "price":
          valueA = a.price;
          valueB = b.price;
          break;
        case "change":
          valueA = a.change;
          valueB = b.change;
          break;
        case "avgPrice":
          valueA = a.price;
          valueB = b.price;
          break;
        case "total":
          valueA = a.price * a.amount;
          valueB = b.price * b.amount;
          break;
        default:
          return 0;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    setCoinsData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <td
              onClick={() => sortByColumn("name")}
              className={styles.nameColumn}
            >
              Name
            </td>
            <td onClick={() => sortByColumn("amount")}>Amount</td>
            <td
              onClick={() => sortByColumn("price")}
              className={styles.smallColumn}
            >
              Price
            </td>
            <td
              onClick={() => sortByColumn("change")}
              className={styles.smallColumn}
            >
              24h Change
            </td>
            <td onClick={() => sortByColumn("avgPrice")}>Avg Price</td>
            <td onClick={() => sortByColumn("total")}>Total</td>
          </tr>
        </thead>
        <tbody>
          {coinsData.map((coin) => (
            <tr key={coin.id}>
              <td className={styles.coinCell}>
                <div className={styles.coinInfo}>
                  <Image
                    src={coin.img}
                    alt={coin.name}
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className={styles.coinName}>{coin.name}</p>
                    <p className={styles.coinSymbol}>{coin.symbol}</p>
                  </div>
                </div>
              </td>
              <td>{coin.amount}</td>
              <td className={styles.smallColumn}>${coin.price}</td>
              <td className={styles.smallColumn}>%{coin.change}</td>
              <td>${coin.price}</td>
              <td>${coin.price * coin.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
