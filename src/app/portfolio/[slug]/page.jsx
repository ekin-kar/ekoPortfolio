"use client";
import Card from "@/components/card/Card";
import styles from "./slug.module.css";
import { useEffect, useState } from "react";
import fetchAndLogSymbolPrice from "@/lib/binanceUtils";

const Coin = () => {
  const [profitPercentage, setProfitPercentage] = useState("");
  const [investment, setInvestment] = useState(100.1);
  const [coinData, setCoinData] = useState({});

  const calculateSellingPrice = () => {
    const sellingPrice = investment * (1 + profitPercentage / 100);
    if (profitPercentage === "" || isNaN(profitPercentage)) {
      return "-";
    } else {
      return sellingPrice
        .toFixed(4)
        .replace(/(\.[0-9]*?)0+$/, "$1")
        .replace(/\.$/, "");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAndLogSymbolPrice();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data only when the component mounts
    if (!coinData.symbol) {
      fetchData();
    }

    console.log(coinData);
  }, [coinData]);

  const handleProfitChange = (e) => {
    let input = e.target.value;
    if (input.length > 6) {
      input = input.slice(0, 6);
    }
    if (input === "" || (parseFloat(input) >= 0 && parseFloat(input) <= 1000)) {
      setProfitPercentage(input);
    }
  };

  const transactionsData = [
    {
      type: "Buy",
      quantity: 2,
      price: 55000,
      worth: 110000,
      date: "2024-03-01 23:00",
      profit: "-",
    },
    {
      type: "Buy",
      quantity: 3,
      price: 50000,
      worth: 150000,
      date: "2024-03-01 23:00",
      profit: "-",
    },
    {
      type: "Sell",
      quantity: 1,
      price: 60000,
      worth: 60000,
      date: "2024-03-02 23:00",
      profit: 5000,
    },
    {
      type: "Buy",
      quantity: 2,
      price: 55000,
      worth: 110000,
      date: "2024-03-01 23:00",
      profit: "-",
    },
    {
      type: "Buy",
      quantity: 3,
      price: 50000,
      worth: 150000,
      date: "2024-03-01 23:00",
      profit: "-",
    },
    {
      type: "Sell",
      quantity: 1,
      price: 60000,
      worth: 60000,
      date: "2024-03-02 23:00",
      profit: 5000,
    },
  ];

  const orders = [
    {
      type: "Buy",
      quantity: 2,
      price: 55000,
      worth: 110000,
      date: "2024-03-01 23:00",
      filled: "0/2 BTC",
    },
    {
      type: "Buy",
      quantity: 3,
      price: 50000,
      worth: 150000,
      date: "2024-03-01 23:00",
      filled: "0/3 BTC",
    },
    {
      type: "Sell",
      quantity: 1,
      price: 60000,
      worth: 60000,
      date: "2024-03-02 23:00",
      filled: "0/1 BTC",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardsWrapper}>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>Bitcoin - BTC</h3>
          <div className={styles.changeWrapper}>
            <p className={styles.midText}>$60000</p>
            <p className={styles.profit}>+%5</p>
          </div>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>Quantity</h3>
          <p className={styles.midText}>5 BTC</p>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>Investment</h3>
          <p className={styles.midText}>$250000</p>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>Average Price</h3>
          <p className={styles.midText}>$50000</p>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>Profit</h3>
          <div className={styles.profitWrapper}>
            <p className={styles.midText}>$5600 </p>
            <p className={styles.profit}>+%5</p>
          </div>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>Total Trades</h3>
          <p className={styles.midText}>10</p>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>All Time Quantity</h3>
          <p className={styles.midText}>$500000</p>
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>All Time Invested</h3>
          <p className={styles.midText}>$400000</p>
        </Card>
        <Card className={styles.inputWrapper}>
          <p className={styles.midText}>
            Selling Price: $ {calculateSellingPrice()}
          </p>
          <input
            className={styles.input}
            type="number"
            value={profitPercentage}
            onChange={handleProfitChange}
            placeholder="Enter profit percentage"
          />
        </Card>
        <Card className={styles.cardWrapper}>
          <h3 className={styles.cardTitle}>All Time Profit</h3>
          <div className={styles.profitWrapper}>
            <p className={styles.midText}>$60000</p>
            <p className={styles.profit}>+%5</p>
          </div>
        </Card>
      </div>
      <Card>
        <button className={styles.button}>Add New Order</button>
      </Card>
      <div className={styles.tablesWrapper}>
        <Card className={styles.ordersCard}>
          <h3 className={styles.tableHeaders}>Orders</h3>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headRow}>
                <td className={styles.headerCells}>Type</td>
                <td className={styles.headerCells}>Quantity</td>
                <td className={styles.headerCells}>Price</td>
                <td className={styles.headerCells}>Worth</td>
                <td className={styles.headerCells}>Date</td>
                <td className={styles.headerCells}>Filled</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className={styles.rows}>
                  <td className={styles.columns}>{order.type}</td>
                  <td className={styles.columns}>{order.quantity} BTC</td>
                  <td className={styles.columns}>${order.price}</td>
                  <td className={styles.columns}>${order.worth}</td>
                  <td className={styles.columns}>{order.date}</td>
                  <td className={styles.columns}>{order.filled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className={styles.transactionsCard}>
          <h3 className={styles.tableHeaders}>Transactions</h3>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headRow}>
                <td className={styles.headerCells}>Type</td>
                <td className={styles.headerCells}>Quantity</td>
                <td className={styles.headerCells}>Price</td>
                <td className={styles.headerCells}>Worth</td>
                <td className={styles.headerCells}>Date</td>
                <td className={styles.headerCells}>Profit</td>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction, index) => (
                <tr key={index} className={styles.rows}>
                  <td className={styles.columns}>{transaction.type}</td>
                  <td className={styles.columns}>{transaction.quantity} BTC</td>
                  <td className={styles.columns}>${transaction.price}</td>
                  <td className={styles.columns}>${transaction.worth}</td>
                  <td className={styles.columns}>{transaction.date}</td>
                  <td className={styles.columns}>{transaction.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
export default Coin;
