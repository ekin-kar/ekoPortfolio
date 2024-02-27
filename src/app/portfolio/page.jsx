import styles from "./portfolio.module.css";
import Table from "@/components/table/Table";

const Portfolio = () => {
  return (
    <div className={styles.portfolio}>
      <h2>My Portfolio</h2>
      <Table />
    </div>
  );
};

export default Portfolio;
