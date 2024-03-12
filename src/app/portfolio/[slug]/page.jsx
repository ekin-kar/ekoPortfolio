"use client";
import Card from "@/components/card/Card";
import styles from "./slug.module.css";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";
import { usePathname } from "next/navigation";

const Coin = () => {
  const [profitPercentage, setProfitPercentage] = useState("");
  const [investment, setInvestment] = useState(0);
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const pathname = usePathname();

  const extractSymbolFromPathname = (pathname) => {
    const parts = pathname.split("/");
    return parts[parts.length - 1];
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const symbol = extractSymbolFromPathname(pathname);
        const res = await fetch(`http://localhost:3000/api/coin/${symbol}`, {
          next: { revalidate: 3600 },
        });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setCoinData(data);
        setInvestment(data.currentAverage);
        setTransactions(data.transactions);
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [pathname]);

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

  const handleProfitChange = (e) => {
    let input = e.target.value;
    if (input.length > 6) {
      input = input.slice(0, 6);
    }
    if (input === "" || (parseFloat(input) >= 0 && parseFloat(input) <= 1000)) {
      setProfitPercentage(input);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.cardsWrapper}>
            <div className={styles.cardColumn}>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>{coinData.symbol}</h3>
                <div className={styles.changeWrapper}>
                  <p className={styles.midText}>{coinData.price}$</p>
                  <p
                    className={
                      coinData.priceChange > 0
                        ? styles.positiveProfit
                        : styles.negativeProfit
                    }
                  >
                    {coinData.priceChange}%
                  </p>
                </div>
              </Card>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>Quantity</h3>
                <p className={styles.midText}>
                  {coinData.assetBalance} {coinData.assetName}
                </p>
              </Card>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>Investment</h3>
                <p className={styles.midText}>{coinData.currentInvestment}$</p>
              </Card>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>Average Price</h3>
                <p className={styles.midText}>{coinData.currentAverage}$</p>
              </Card>
            </div>
            <div className={styles.cardColumn}>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>Profit</h3>
                <div className={styles.profitWrapper}>
                  <p className={styles.midText}>{coinData.realisedProfit}$</p>
                </div>
              </Card>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>Total Fees</h3>
                <p className={styles.smallText}>
                  {coinData.totalUsdtFee}$ - {coinData.totalSymbolFee}
                  {coinData.assetName} - {coinData.totalBnbFees}BNB
                </p>
              </Card>
              <Card className={styles.cardWrapper}>
                <h3 className={styles.cardTitle}>All Time Invested</h3>
                <p className={styles.midText}>{coinData.totalSpent}$</p>
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
            </div>
          </div>
          <div className={styles.tablesWrapper}>
            <Card className={styles.ordersCard}>
              <h3 className={styles.tableHeaders}>Orders</h3>
              {orders.length > 0 ? (
                <table className={styles.table}>
                  <thead className={styles.thead}>
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
                        <td className={styles.columns}>
                          {order.origQty} {coinData.assetName}
                        </td>
                        <td className={styles.columns}>${order.price}</td>
                        <td className={styles.columns}>
                          {Number(order.price * order.origQty).toFixed(2)}$
                        </td>
                        <td className={styles.columns}>
                          {new Date(Number(order.time)).toLocaleString("tr-TR")}
                        </td>
                        <td className={styles.columns}>
                          {order.executedQty} / {order.origQty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No open orders</p>
              )}
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
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .slice()
                    .reverse()
                    .map((transaction, index) => (
                      <tr key={index} className={styles.rows}>
                        <td className={styles.columns}>
                          {transaction.isBuyer ? "Buy" : "Sell"}
                        </td>
                        <td className={styles.columns}>{transaction.qty}</td>
                        <td className={styles.columns}>{transaction.price}$</td>
                        <td className={styles.columns}>
                          {Number(transaction.quoteQty).toFixed(2)}$
                        </td>
                        <td className={styles.columns}>
                          {new Date(Number(transaction.time)).toLocaleString(
                            "tr-TR"
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
export default Coin;
