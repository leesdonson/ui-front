import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";
import { FilterProvider } from "./context/FilterContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./components/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";

const App = () => {
  return (
    <UserProvider>
      <ToastContainer />
      <ProductProvider>
        <CartProvider>
          <FilterProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/product/details/:id"
                  element={<ProductDetails />}
                />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
              </Route>
            </Routes>
          </FilterProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
