import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, ListGroup, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";

const ProductSreen = () => {
  const productId = useParams();

  const [product, setProduct] = useState({});
  useEffect(() => {
    const dataFetch = async () => {
      const { data } = await axios.get(`/api/products/${productId.id}`);
      setProduct(data);
    };
    dataFetch();
  }, [productId.id]);

  return (
    <>
      <Row className="mt-5 ms-3">
        <Col md={3}>
          <Image
            src={product.image}
            alt={product.name}
            fluid
            className="rounded"
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush" className="p-1">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Link to="/">
        <Button variant="secondary my-3 mx-4" type="button">
          Go Back
        </Button>
      </Link>
    </>
  );
};

export default ProductSreen;
