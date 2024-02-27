import styles from "./card.module.css";

const Card = ({ children, width }) => {
  const cardStyles = {
    width: width || "100%",
  };
  return (
    <div className={styles.card} style={cardStyles}>
      {children}
    </div>
  );
};
export default Card;
