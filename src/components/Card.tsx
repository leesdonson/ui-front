import { Link } from "react-router-dom";
import styles from "../styles/card.module.css";
import { CartItemsProps } from "../types/models";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Card = ({ products }: { products: CartItemsProps }) => {
  const { cart, setCart } = useContext(CartContext);

  const exists = cart.find((x: CartItemsProps) => x.id === products.id);
  const handleAddToCart = (cartItems: CartItemsProps) => {
    const itemIndex = cart.findIndex(
      (item: CartItemsProps) => item.id === cartItems.id
    );

    if (itemIndex >= 0) {
      const cartItem = cart[itemIndex];
      cartItem.cartQuantity += 1;

      toast.success("Item quantity increased.");
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart([...cart]);
    } else {
      toast.success("New item added to cart.");
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...cartItems, cartQuantity: 1 }])
      );
      setCart([...cart, { ...cartItems, cartQuantity: 1 }]);
    }
  };

  //remove cart item
  const handleRemoveFromCart = (products: CartItemsProps) => {
    const itemIndex = cart.findIndex(
      (item: CartItemsProps) => item.id === products.id
    );
    if (itemIndex >= 0) {
      const cartItem = cart[itemIndex];
      if (cartItem.cartQuantity > 1) {
        cartItem.cartQuantity -= 1;
        toast.warning("Item quantity decreased.", {
          position: "top-left",
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart([...cart]);
      } else {
        toast.warn("Item got removed from the cart.", {
          position: "top-left",
        });
        cart.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart([...cart]);
      }
    }
  };

  return (
    <div className={styles.cards}>
      <div className={styles.card_item}>
        <div className={styles.image_box}>
          <Link to={`/product/details/${products.id}`}>
            <img
              loading="lazy"
              src={products.images[0]}
              alt={products.title}
              className={styles.img}
            />
          </Link>
        </div>
        <Link className={styles.title} to={`/product/details/${products.id}`}>
          <h2 className={styles.title}>{products.title}</h2>
        </Link>
        <div className={styles.price_category}>
          <p className={styles.price}>${products.price}</p>
          <p className={styles.price}>{products.category}</p>
        </div>
        <p className={styles.description}>{products.description}</p>
        <p className={styles.rating}>Ratings: {products.rating}</p>
        <div className={styles.btn_box}>
          {exists ? (
            <div className={styles.action_btn}>
              <button
                onClick={() => handleRemoveFromCart(products)}
                className={styles.btn}
              >
                -
              </button>
              <span>{exists.cartQuantity}</span>
              <button
                onClick={() => handleAddToCart(products)}
                className={styles.btn}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(products)}
              className={styles.btn}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
