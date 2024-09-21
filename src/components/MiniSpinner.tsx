import styles from "../styles/spinner.module.css";
const MiniSpinner = () => {
  return (
    <div className={styles.miniSpinner}>
      <div className={styles.wrapper_mini}>
        <div className={styles.loader_mini}></div>
      </div>
    </div>
  );
};

export default MiniSpinner;
