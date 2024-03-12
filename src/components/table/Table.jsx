"use client";
import Image from "next/image";
import styles from "./table.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sortData } from "@/lib/tableSort";
import Loading from "../loading/Loading";

const Table = ({ onTotalWorthChange }) => {
  const [coinsData, setCoinsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [totalWorthSum, setTotalWorthSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const sortByColumn = (column) => {
    const order = column === sortColumn && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = sortData(column, order, coinsData);

    setCoinsData(sortedData);
    setSortColumn(column);
    setSortOrder(order);
  };

  const renderArrow = (column) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const handleRowClick = (coinSymbol) => {
    router.push(`/portfolio/${coinSymbol.toUpperCase()}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/assets", {
          next: { revalidate: 3600 },
        });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setCoinsData(data);
        const sum = data.reduce((acc, coin) => {
          const totalWorthValue = parseFloat(coin.totalWorth);
          if (!isNaN(totalWorthValue)) {
            return acc + totalWorthValue;
          }
          return acc.toFixed(2);
        }, 0);
        setTotalWorthSum(sum);
        onTotalWorthChange(sum);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              <td
                onClick={() => sortByColumn("name")}
                className={(styles.nameColumn, styles.headerCells)}
              >
                Name {renderArrow("name")}
              </td>
              <td
                className={styles.headerCells}
                onClick={() => sortByColumn("amount")}
              >
                Amount {renderArrow("amount")}
              </td>
              <td
                onClick={() => sortByColumn("price")}
                className={styles.headerCells}
              >
                Price {renderArrow("price")}
              </td>
              <td
                onClick={() => sortByColumn("change")}
                className={styles.headerCells}
              >
                24h Change {renderArrow("change")}
              </td>
              <td
                className={styles.headerCells}
                onClick={() => sortByColumn("avgPrice")}
              >
                Avg Price {renderArrow("avgPrice")}
              </td>
              <td
                className={styles.headerCells}
                onClick={() => sortByColumn("total")}
              >
                Total {renderArrow("total")}
              </td>
            </tr>
          </thead>
          <tbody>
            {coinsData.map((coin) => (
              <tr
                key={coin.id}
                className={styles.rows}
                onClick={() => handleRowClick(coin.asset)}
              >
                <td className={styles.columns}>
                  <div className={styles.coinInfo}>
                    <Image
                      src={coin.icon}
                      alt={coin.asset}
                      width={50}
                      height={50}
                    />
                    <div>
                      <p className={styles.coinName}>{coin.asset}</p>
                      <p className={styles.coinSymbol}>{coin.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className={styles.columns}>{coin.free}</td>
                <td className={styles.columns}>${coin.price}</td>
                <td className={styles.columns}>%{coin.priceChange}</td>
                <td className={styles.columns}>${coin.currentAverage}</td>
                <td className={styles.columns}>${coin.totalWorth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default Table;
