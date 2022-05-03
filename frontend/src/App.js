import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // after installing "npm i react-bootstrap" on terminal
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductSreen from "./screens/ProductSreen";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="py-4">
              <Container>
                <HomeScreen />
              </Container>
            </main>
          }
        />
        <Route path="/product/:id" element={<ProductSreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
