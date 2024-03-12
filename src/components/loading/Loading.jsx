"use client";
import { useState } from "react";
import styles from "./loading.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div className={styles.wrapper}>
      <ClipLoader color="#c5c5c5" loading={loading} size={150} />
    </div>
  );
};

export default Loading;
