import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/productDetails.module.css";
import { CartItemsProps, ProductsProps } from "../types/models";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);

  const [products, setProducts] = useState<any[]>([]);

  const navigate = useNavigate();

  if (!id) return null;

  const productDetail = products?.find(
    (item: ProductsProps) => item.id === parseInt(id)
  );

  useEffect(() => {
    const getData = async () => {
      let url = "https://dummyjson.com/products";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
    };

    getData();
  }, [id]);

  const exists = cart.find((x: CartItemsProps) => x.id === productDetail?.id);
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
              src={productDetail?.images[0]}
              alt={productDetail?.title}
            />
          </div>
          {productDetail?.images?.length > 1 && (
            <div className={styles.imgbox_small}>
              {productDetail?.images.map((img: string, i: number) => (
                <img
                  key={i}
                  className={styles.img_small}
                  src={img}
                  alt={productDetail?.title}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.info_container}>
          <h1 className={styles.title}>{productDetail?.title}</h1>
          <div className={styles.detail_group}>
            <div className={styles.detail}>
              <p className={styles.info}>Brand: </p>
              <span className={styles.value}>{productDetail?.brand}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Category: </p>
              <span className={styles.value}>
                {productDetail?.category.toUpperCase()}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>MOQ: </p>
              <span className={styles.value}>
                {productDetail?.minimumOrderQuantity}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Price: </p>
              <span className={styles.value}>${productDetail?.price}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Availability: </p>
              <span className={styles.value}>
                {productDetail?.availabilityStatus}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Rating: </p>
              <span className={styles.value}>{productDetail?.rating}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Reviews: </p>
              <span className={styles.value}>
                {productDetail?.reviews.length}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Stock: </p>
              <span className={styles.value}>{productDetail?.stock}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>SKU: </p>
              <span className={styles.value}>{productDetail?.sku}</span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Return Policy: </p>
              <span className={styles.value}>
                {productDetail?.returnPolicy}
              </span>
            </div>
            <div className={styles.detail}>
              <p className={styles.info}>Shipping Info: </p>
              <span className={styles.value}>
                {productDetail?.shippingInformation}
              </span>
            </div>

            <div className={styles.detail}>
              <p className={styles.info}>Warranty: </p>
              <span className={styles.value}>
                {productDetail?.warrantyInformation}
              </span>
            </div>
            <div className={` ${styles.description}`}>
              <p className={styles.infod}>Description: </p>
              <span className={styles.valued}>
                {productDetail?.description}
              </span>
            </div>
          </div>
          <div className={styles.addTocart}>
            {exists ? (
              <div className={styles.action_btn}>
                <button
                  onClick={() => handleRemoveFromCart(productDetail)}
                  className={styles.btn}
                >
                  -
                </button>
                <span>{exists.cartQuantity}</span>
                <button
                  onClick={() => handleAddToCart(productDetail)}
                  className={styles.btn}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(productDetail)}
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
