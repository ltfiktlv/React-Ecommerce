import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };
    fetchProducts();
  });

  return (
    <>
      <h1>Latest Products</h1>
      <hr></hr>
      <Row>
        {products.map((products) => (
          <Col key={products._id}>
            <Product product={products} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
