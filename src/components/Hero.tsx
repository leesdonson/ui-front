import { useNavigate } from "react-router-dom";
import styles from "../styles/hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const windowWidth = parseInt(window.innerWidth.toFixed());
  const breakPoint: number = 768;

  return (
    <div className={styles.hero}>
      <div className={styles.top}>
        <h3 className={styles.title}>UI-Front.</h3>
        <h1
          className={
            windowWidth > breakPoint
              ? styles.title_main_type
              : styles.title_main_notype
          }
        >
          Made for better shopping experience.
        </h1>
      </div>
      <p className={styles.description}>Browse all products right here.</p>
      <div className={styles.bottom}>
        <button
          onClick={() => navigate("/products")}
          className={styles.btn}
          type="button"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/about")}
          className={styles.btn}
          type="button"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
