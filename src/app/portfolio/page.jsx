import Card from "@/components/card/Card";
import styles from "./portfolio.module.css";
import Table from "@/components/table/Table";

const Portfolio = () => {
  return (
    <div className={styles.portfolio}>
      <Card>
        <h2 className={styles.bigText}>My Portfolio</h2>
      </Card>
      <Card width="25%">
        <p className={styles.smallText}>Total Worth</p>
        <p className={styles.bigText}>$50000</p>
        <p className={styles.profit}>+%5</p>
      </Card>
      <Card>
        <Table />
      </Card>
    </div>
  );
};

export default Portfolio;
