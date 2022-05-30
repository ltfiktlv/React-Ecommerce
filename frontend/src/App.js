import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // after installing "npm i react-bootstrap" on terminal
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductSreen from "./screens/ProductSreen";
import CartScreen from "./screens/CartScreen";
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || "[]"; //calling back the data that we stored before.
function App() {
  const [cart, setCart] = useState(cartFromLocalStorage); //this way we don't lose cart items when switching page or refreshing page
  const [price, setPrice] = useState(0);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleClick = (products, qty) => {
    const exist = cart.find((item) => item._id === products._id);

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

    console.log(exist.defaultCartStock);
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
    console.log(cart);
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    handlePrice();
  };
  const handlePrice = () => {
    let ans = 0;
    let total = 0;
    cart.map((items) =>
      items.defaultCartStock >= items.countInStock
        ? (ans += items.countInStock * items.price)
        : (ans += items.defaultCartStock * items.price)
    );

    cart.map((item) =>
      item.defaultCartStock >= item.countInStock
        ? (total += Number(item.countInStock))
        : (total += Number(item.defaultCartStock))
    );
    console.log(Number(total));

    setPrice(ans.toFixed(2));
    setSum(total);
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
        ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
