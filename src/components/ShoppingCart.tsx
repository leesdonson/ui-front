import { useNavigate } from "react-router-dom";
import styles from "../styles/shoppingCart.module.css";
import { CartItemsProps } from "../types/models";
import { GiShoppingCart } from "react-icons/gi";
import { LiaTimesSolid } from "react-icons/lia";

const ShoppingCart = () => {
  const navigate = useNavigate();
  let cartItems: CartItemsProps[] | null =
    localStorage.getItem("cart") !== null
      ? (JSON.parse(localStorage.getItem("cart") as string) as CartItemsProps[])
      : null;

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.header}>
        <button
          onClick={() => navigate(-1)}
          className={styles.btn}
          type="button"
        >
          Go Back Shopping
        </button>
        <h1 className={styles.title}>Shopping Cart</h1>
      </div>

      <div className={styles.cartItems}>
        {cartItems && cartItems.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.tr}>
                  <th className={styles.th}>Product Name</th>
                  <th className={styles.th}>Quantity</th>
                  <th className={styles.th}>Unit Price</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {cartItems.map((item: CartItemsProps) => (
                  <tr className={styles.tr} key={item.id}>
                    <td className={styles.td}>{item.title}</td>
                    <td className={`${styles.td} ${styles.tdCartQuantity}`}>
                      {item.cartQuantity}
                    </td>
                    <td className={`${styles.td} ${styles.tdprice}`}>
                      ${item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.checkout}>
              <div className={styles.totalContainer}>
                <p className={styles.total}>
                  Cart Item(s):{" "}
                  {cartItems.reduce((acc, item) => acc + item.cartQuantity, 0)}
                </p>
                <p className={styles.total}>
                  Total:
                  <span className={styles.price}>
                    $
                    {cartItems
                      .reduce((acc: number, item: CartItemsProps) => {
                        return acc + item.price * item.cartQuantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </p>
              </div>
              <div className={styles.btnContainer}>
                <button
                  onClick={() => navigate("/checkout")}
                  className={styles.checkout_btn}
                  type="button"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.noItemsContainer}>
            <div className={styles.noItemsIcons}>
              <LiaTimesSolid className={styles.noItemsIconX} />
              <GiShoppingCart size={40} className={styles.noItemsIcon} />
            </div>
            <p className={styles.noItems}>No items in the cart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
