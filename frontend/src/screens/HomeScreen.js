import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
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
