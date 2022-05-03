import React from "react";
import { Row, Col, Card, Image, ListGroup, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";
const ProductSreen = () => {
  const productId = useParams();

  const productParam = products.find((p) => p._id === productId.id);
  console.log(productParam);
  return (
    <>
      <Row className="mt-5 ms-3">
        <Col md={3}>
          <Image
            src={productParam.image}
            alt={productParam.name}
            fluid
            className="rounded"
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{productParam.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={productParam.rating}
                text={productParam.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>{productParam.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush" className="p-1">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: <strong>${productParam.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:{" "}
                    <strong>
                      {productParam.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  disabled={productParam.countInStock === 0}
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
