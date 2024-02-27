import Card from "@/components/card/Card";
import styles from "./portfolio.module.css";
import Table from "@/components/table/Table";

const Portfolio = () => {
  return (
    <div className={styles.portfolio}>
      <h2 className={styles.title}>My Portfolio</h2>
      <div className={styles.wrapper}>
        <div className={styles.worthCard}>
          <p className={styles.worth}>Total Worth</p>
          <p className={styles.worthVal}>$50000</p>
          <p className={styles.profit}>+%5</p>
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.button}>Sync</button>
          <button className={styles.button}>Add New Coin</button>
        </div>
      </div>
      <Card>
        <Table />
      </Card>
    </div>
  );
};

export default Portfolio;
