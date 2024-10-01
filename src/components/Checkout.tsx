import { useNavigate } from "react-router-dom";
import styles from "../styles/checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.checkout}>
      <div className={styles.content}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.description}>
          Click on the pay button to continue or cancel to go back.
        </p>
        <div className={styles.confirm_btns}>
          <button
            className={`${styles.btn} ${styles.payNow}`}
            onClick={() => navigate("/checkout/success")}
            type="button"
          >
            Pay Now
          </button>
          <button
            className={styles.btn}
            onClick={() => navigate(-1)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
