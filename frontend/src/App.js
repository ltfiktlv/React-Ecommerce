import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // after installing "npm i react-bootstrap" on terminal
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductSreen from "./screens/ProductSreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import UserProfile from "./screens/UserProfile";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CheckOutScreen from "./screens/CheckOutScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || []; //calling back the data that we stored before.

function App() {
  const [cart, setCart] = useState(cartFromLocalStorage); //this way we don't lose cart items when switching page or refreshing page
  const [price, setPrice] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClick = (products, qty) => {
    if (cart) {
      var exist = cart.find((item) => item._id === products._id);
    }
    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === products._id
            ? {
                ...exist,
                defaultCartStock: exist.defaultCartStock + (qty || 1),
              }
            : item
        )
      );
    } else setCart([...cart, { ...products, defaultCartStock: qty || 1 }]);
  };

  const handleChange = (products, d) => {
    const index = cart.indexOf(products);
    const basket = cart;
    const hold = basket[index].countInStock;
    console.log(`hold: ${hold}`);
    if (basket[index].defaultCartStock === 0) {
      basket[index].defaultCartStock = 1;
      setCart([...basket]);
    }
    if (basket[index].defaultCartStock > basket[index].countInStock) {
      basket[index].defaultCartStock = hold - 1;
      setCart([...basket]);
    } else if (basket[index].defaultCartStock < basket[index].countInStock) {
      basket[index].defaultCartStock += d;
      setCart([...basket]);
    } else if (d === -1) {
      basket[index].defaultCartStock += d;
      setCart([...basket]);
    }
    console.log(`in stock : ${basket[index].countInStock}`);
    console.log(`in cart stock: ${basket[index].defaultCartStock}`);
  };
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    handlePrice();
  };
  const handlePrice = () => {
    let ans = 0;
    let total = 0;
    if (cart) {
      cart.map((items) =>
        items.defaultCartStock >= items.countInStock
          ? (ans += Number(items.countInStock * items.price))
          : (ans += Number(items.defaultCartStock * items.price))
      );

      cart.map((item) =>
        item.defaultCartStock >= item.countInStock
          ? (total += Number(item.countInStock))
          : (total += Number(item.defaultCartStock))
      );

      setPrice(ans.toFixed(2));
      setSum(total);
    }
  };

  return (
    <Router>
      <Header quantity={sum} handleQty={handlePrice} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="py-4">
              <Container>
                <HomeScreen handleClick={handleClick} />
              </Container>
            </main>
          }
        />
        <Route
          path="/product/:id"
          element={<ProductSreen handleClick={handleClick} />}
        />
        <Route
          path="/cart"
          element={
            <CartScreen
              cart={cart}
              setCart={setCart}
              handleAdd={handleClick}
              handleChange={handleChange}
              handleRemove={handleRemove}
              handlePrice={handlePrice}
              price={price}
              quantity={sum}
            />
          }
        />
        <Route path="/users/login" element={<LoginScreen />} />
        <Route path="/users/profile" element={<UserProfile />} />
        <Route path="/users/register" element={<RegisterScreen />} />
        <Route path="/address" element={<ShippingAddressScreen />} />
        <Route
          path="/overview"
          element={<PaymentScreen cart={cart} price={price} quantity={sum} />}
        />

        <Route path="/orders/:id" element={<CheckOutScreen />} />
        <Route
          path="/myorders/:id"
          element={
            <OrderDetailScreen cart={cart} price={price} quantity={sum} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
