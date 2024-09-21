import styles from "../styles/checkoutSuccess.module.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const CheckoutSuccess = () => {
  const { width, height } = useWindowSize();
  const navigate = () => {
    localStorage.removeItem("cart");
    window.location.href = "/";
  };
  return (
    <div className={styles.checkout_success}>
      <Confetti width={width} height={height} />
      <div className={styles.content}>
        <h1 className={styles.title}>Congratulations! 🎉✨</h1>
        <p className={styles.description}>Thank you for your purchase!</p>
        <button className={styles.btn} onClick={navigate} type="button">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
