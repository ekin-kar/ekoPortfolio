import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>ekinkar</div>
      <div className={styles.text}>EkoPortfolio &copy; 2024</div>
    </div>
  );
};

export default Footer;
