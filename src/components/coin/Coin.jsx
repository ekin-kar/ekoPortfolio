import styles from "./coin.module.css";

const Coin = ({ name, symbol, price }) => {
  return (
    <div className={styles.coin}>
      <h3>{name}</h3>
      <p>{symbol}</p>
      <p>${price}</p>
    </div>
  );
};

export default Coin;
