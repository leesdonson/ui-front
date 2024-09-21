import { Link } from "react-router-dom";
import styles from "../styles/cart.module.css";
import { BsCart4 } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Cart = () => {
  const { cart } = useContext(CartContext);
  // console.log(cart);
  return (
    <div className={styles.cart}>
      <Link className={styles.title} to="/cart">
        <BsCart4 className={styles.cart_icon} />
        <div className={styles.count}>
          <p className={styles.cart_count}>
            {cart.length > 0 ? cart.length : 0}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
