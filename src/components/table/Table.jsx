"use client";
import Image from "next/image";
import styles from "./table.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { coins } from "@/lib/data";
import { sortData } from "@/lib/tableSort";

const Table = () => {
  const [coinsData, setCoinsData] = useState(coins);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);

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
    router.push(`/portfolio/${coinSymbol.toLowerCase()}`);
  };

  return (
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
            onClick={() => handleRowClick(coin.symbol)}
          >
            <td className={styles.columns}>
              <div className={styles.coinInfo}>
                <Image src={coin.img} alt={coin.name} width={50} height={50} />
                <div>
                  <p className={styles.coinName}>{coin.name}</p>
                  <p className={styles.coinSymbol}>{coin.symbol}</p>
                </div>
              </div>
            </td>
            <td className={styles.columns}>{coin.amount}</td>
            <td className={styles.columns}>${coin.price}</td>
            <td className={styles.columns}>%{coin.change}</td>
            <td className={styles.columns}>${coin.price}</td>
            <td className={styles.columns}>${coin.price * coin.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
