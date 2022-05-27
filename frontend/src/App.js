import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // after installing "npm i react-bootstrap" on terminal
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductSreen from "./screens/ProductSreen";
import CartScreen from "./screens/CartScreen";

function App() {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const handleClick = (products) => {
    if (cart.indexOf(products) !== -1) return; //indexOf returns -1 if the item not found.
    setCart([...cart, products]);
    console.log(cart);
  };

  const handleChange = (products, d) => {
    const index = cart.indexOf(products);
    const basket = cart;

    if (basket[index].defaultCartStock === 0) {
      basket[index].defaultCartStock = 1;
      setCart([...basket]);
    } else if (basket[index].defaultCartStock < basket[index].countInStock) {
      basket[index].defaultCartStock += d;
      setCart([...basket]);
    } else if (d === -1) {
      basket[index].defaultCartStock += d;
      setCart([...basket]);
    }

    console.log(basket[index].defaultCartStock);
  };
  const handleRemove = (id) => {
    console.log(cart);
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    handlePrice();
  };
  const handlePrice = () => {
    let ans = 0;
    cart.map((items) => (ans += items.defaultCartStock * items.price));
    setPrice(ans.toFixed(2));
  };
  return (
    <Router>
      <Header />
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
          element={<ProductSreen cart={cart} handleClick={handleClick} />}
        />
        <Route
          path="/cart"
          element={
            <CartScreen
              cart={cart}
              setCart={setCart}
              handleChange={handleChange}
              handleRemove={handleRemove}
              handlePrice={handlePrice}
              price={price}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
