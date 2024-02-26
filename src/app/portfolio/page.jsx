import Coin from "@/components/coin/Coin";
import styles from "./portfolio.module.css";
import Link from "next/link";

export const metadata = {
  title: "Portfolio ",
  description: "Manage Your Portfolio",
};

const coinsData = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 50000 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 2000 },
  { id: 3, name: "Litecoin", symbol: "LTC", price: 150 },
  { id: 4, name: "Ripple", symbol: "XRP", price: 1 },
  { id: 5, name: "Stellar", symbol: "XLM", price: 0.5 },
  { id: 6, name: "Chainlink", symbol: "LINK", price: 30 },
  { id: 7, name: "Cardano", symbol: "ADA", price: 2 },
  { id: 8, name: "Polkadot", symbol: "DOT", price: 40 },
];

const Portfolio = () => {
  return (
    <div className={styles.portfolio}>
      <h2>My Portfolio</h2>
      <div className={styles.wrapper}>
        {coinsData.map((coin) => (
          <Link
            className={styles.link}
            key={coin.id}
            href={`/portfolio/${coin.symbol.toLowerCase()}`}
          >
            <Coin key={coin.id} {...coin} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Portfolio;
