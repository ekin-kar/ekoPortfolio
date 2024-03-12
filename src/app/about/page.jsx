import Link from "next/link";
import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.paragraphWrapper}>
        <h1 className={styles.title}>About Me</h1>
        <p className={styles.paragraph}>
          I am Ekin Kar, developer of this app. I am a FrontEnd Developer and a
          Computer Engineering student.
        </p>
        <p className={styles.paragraph}>
          When I was trading, I felt a lack of a tool that can help me track my
          trades and analyze them.
        </p>
        <p className={styles.paragraph}>
          So I decided to build this app to help myself and others who are in
          the same situation.
        </p>
      </div>
      <div className={styles.paragraphWrapper}>
        <h2 className={styles.title}>About the App</h2>
        <p className={styles.paragraph}>
          You can track your orders, your trades, and easily see your average
          price and profit/loss.
        </p>
        <p className={styles.paragraph}>
          You can create an account and add your Binance API keys to track your
          trades automatically.
        </p>
        <p className={styles.paragraph}>
          Make sure to only give reading permissions to the API keys. All API
          keys are encrypted and stored securely in the database.
        </p>
      </div>
      <div className={styles.paragraphWrapper}>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.paragraph}>
          I hope you find this app useful. If you have any feedback or feature
          requests, feel free to contact me.
        </p>
        <p className={styles.paragraph}>
          You can find my contact information on my personal website.
        </p>
        <p className={styles.paragraph}>
          Go to my website: <Link href="https://ekinkar.com">ekinkar.com</Link>
        </p>
      </div>
    </div>
  );
};

export default About;
