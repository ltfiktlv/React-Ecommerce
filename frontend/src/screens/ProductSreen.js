import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";
import "./ProductScreen.css";

const ProductSreen = ({ handleClick }) => {
  const productId = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const dataFetch = async () => {
      const { data } = await axios.get(`/api/products/${productId.id}`);
      setProduct(data);
    };
    dataFetch();
  }, [productId]);

  const [qty, setQty] = useState(0);

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
                    Price: <strong>{product.price}₺</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>
                      {product.countInStock > 0
                        ? `In Stock(${product.countInStock})`
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroupItem className="class">
                  <Row>
                    {/* <Col>Quantity</Col> */}
                    {/* <Col className="button1">
                      <Button
                        onClick={() => {
                          const c = qty;
                          let count = c - 1 < 0 ? c : c - 1;
                          setQty(count);
                        }}
                      >
                        -
                      </Button>
                    </Col> */}

                    <Col className="qty">
                      <Form>
                        <input
                          type="number"
                          list="quantity"
                          name="quantity"
                          id="quantityInput"
                          placeholder="1"
                          min="1"
                          max={product.countInStock}
                          onChange={(e) => {
                            setQty(Number(e.target.value));
                          }}
                        />
                        <datalist
                          id="quantity"
                          name="quantity"
                          onChange={(e) => {
                            setQty(Number(e.target.value));
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((t) => (
                            <option key={t + 1} value={t + 1}>
                              {t + 1}
                            </option>
                          ))}
                        </datalist>
                      </Form>
                    </Col>
                    {/* <Col className="button">
                      <Button
                        onClick={() => {
                          let b = qty;
                          const count = [...Array(product.countInStock).keys()]
                            .length;
                          let target = b + 1 > count ? b : b + 1;
                          ++target;
                          setQty(target - 1);
                        }}
                      >
                        +
                      </Button>
                    </Col> */}
                    <Col>
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                          handleClick(product, qty);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i>
                        Add to Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              {product.countInStock === 0 && (
                <ListGroupItem>
                  <Row>
                    <Col className="d-grid gap-2">
                      <Button variant="secondary" type="button" disabled>
                        ADD TO CART
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Link to="/">
        <Button
          variant="secondary"
          style={{ marginLeft: "1.7rem", marginTop: "1rem" }}
          type="button"
        >
          Go Back
        </Button>
      </Link>
    </>
  );
};

export default ProductSreen;
