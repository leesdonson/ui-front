// import React from 'react'
import styles from "../styles/spinner.module.css";
const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}>
        <div className={styles.loaderInner}>
          <p className={styles.text}>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
