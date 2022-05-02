import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card style={{ width: "19rem" }} className="my-3 p-3 rounded">
      <a href={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      <Card.Body as="text">
        <a
          href={`/products/${product._id}`}
          className="text-center text-decoration-none"
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text>
          <Rating
            value={product.rating}
            text={`from ${product.numReviews} reviews.`}
          />
        </Card.Text>

        <Card.Text as="h3">
          <div className="text-end mt-4 mb-0">${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
