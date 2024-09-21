import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { CartContext } from "./context/CartContext";

const RootLayout = () => {
  const { setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  //set user data
  useEffect(() => {
    let cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
    setUser({
      name: "root user",
      email: "root@example.com",
    });
  }, [setUser, setCart]);

  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
