import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product, handleClick }) => {
  return (
    <Card style={{ width: "19rem" }} className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-center text-decoration-none"
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Row>
          <Col as="h4">
            <div className="text-start mt-4 mb-0">{product.price}₺</div>
          </Col>
          <Col>
            <Button
              size="md"
              className="deneme"
              disabled={product.countInStock === 0}
              onClick={() => {
                handleClick(product);
              }}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Product;
