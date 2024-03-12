import Image from "next/image";
import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.texts}>
        <div>
          <h1 className={styles.title}>Welcome to Eko Portfolio</h1>
          <p className={styles.paragraph}>
            A simple portfolio app to track your trades and analyze them.
          </p>
        </div>
        <div>
          <p className={styles.paragraph}>
            Easily connect your account and add your Binance API keys <br /> to
            track your trades automatically.
          </p>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src="/crypto.png"
          alt="Crypto"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default HomePage;
