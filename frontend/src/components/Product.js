import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card style={{ width: "19rem" }} className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body as="text">
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

        <Card.Text as="h3">
          <div className="text-end mt-4 mb-0">${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
