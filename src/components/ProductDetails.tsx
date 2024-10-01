import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/productDetails.module.css";
import { CartItemsProps } from "../types/models";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
// import { use } from "framer-motion/client";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);

  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!id) return null;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let url = `https://dummyjson.com/products/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      setProduct(data);
      setLoading(false);
    };

    getData();
  }, [id]);

  const exists = cart.find((x: CartItemsProps) => x.id === product?.id);
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
      toast.success("New item added to the cart.");
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...cartItems, cartQuantity: 1 }])
      );
      setCart([...cart, { ...cartItems, cartQuantity: 1 }]);
    }
  };

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

  if (loading) return <Spinner />;

  return (
    <section className={styles.detail_section}>
      <div className={styles.back_btn}>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className={styles.back}
        >
          Back
        </button>
      </div>
      <div className={styles.details}>
        <div className={styles.image_container}>
          <div className={styles.main_img}>
            <img
              className={styles.img}
              src={product?.images[0]}
              alt={product?.title}
            />
          </div>
          {product?.images?.length > 1 && (
            <div className={styles.imgbox_small}>
              {product?.images.map((img: string, i: number) => (
                <img
                  key={i}
                  className={styles.img_small}
                  src={img}
                  alt={product?.title}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.info_container}>
          <h1 className={styles.title}>{product?.title}</h1>
          <div className={styles.detail_group}>
            <div className={styles.detail}>
              <p className={styles.info}>Brand: </p>
              <span className={styles.value}>
                {product?.brand ? product?.brand : "N/A"}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Category: </p>
              <span className={styles.value}>
                {product?.category.toUpperCase()}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>MOQ: </p>
              <span className={styles.value}>
                {product?.minimumOrderQuantity}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Price: </p>
              <span className={styles.value}>${product?.price}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Availability: </p>
              <span className={styles.value}>
                {product?.availabilityStatus}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Rating: </p>
              <span className={styles.value}>{product?.rating}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Reviews: </p>
              <span className={styles.value}>{product?.reviews.length}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Stock: </p>
              <span className={styles.value}>{product?.stock}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>SKU: </p>
              <span className={styles.value}>{product?.sku}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Return Policy: </p>
              <span className={styles.value}>{product?.returnPolicy}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Shipping Info: </p>
              <span className={styles.value}>
                {product?.shippingInformation}
              </span>
            </div>

            <div className={styles.detail}>
              <p className={styles.info}>Warranty: </p>
              <span className={styles.value}>
                {product?.warrantyInformation}
              </span>
            </div>
            <div className={` ${styles.description}`}>
              <p className={styles.infod}>Description: </p>
              <span className={styles.valued}>{product?.description}</span>
            </div>
          </div>
          <div className={styles.addTocart}>
            {exists ? (
              <div className={styles.action_btn}>
                <button
                  onClick={() => handleRemoveFromCart(product)}
                  className={styles.btn}
                >
                  -
                </button>
                <span>{exists.cartQuantity}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={styles.btn}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className={styles.btn}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
