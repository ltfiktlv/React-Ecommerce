import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StepChecker from "../components/StepChecker";

const PaymentScreen = ({ cart, price }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const shippingPrice = 5;
  const totalPrice = Number(price) + shippingPrice;
  const shoppingCart = cart;
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cart);
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    let data = {
      orderItems: shoppingCart,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: price,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
    };
    await axios.post("/api/orders", data, config);
  };

  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <ListGroup>
          <ListGroupItem>
            <StepChecker signIn shippingAddress payment />
          </ListGroupItem>
        </ListGroup>
      </Container>

      <Card
        style={{ width: "90%", height: "75vh" }}
        className="m-auto p-3 rounded"
      >
        {!localStorage.getItem("user") ? (
          navigate("/users/login?redirect=address")
        ) : (
          <Card.Body className="pb-0" style={{ paddingTop: "1rem" }}>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Form.Label as="legend">Payment Method</Form.Label>
                        <Form.Check
                          checked
                          type="radio"
                          label="PayPal"
                          name="paymentMethod"
                          value="PayPal"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                          type="radio"
                          label="Cash"
                          name="paymentMethod"
                          value="Cash"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button type="submit">Continue</Button>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  marginBottom: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <ListGroup>
                  <ListGroupItem>
                    <Card.Text
                      style={{ fontSize: "1.5rem", textAlign: "center" }}
                    >
                      Shipping Details
                    </Card.Text>
                    <hr></hr>
                    <Card.Text>
                      {shippingAddress.city} {shippingAddress.district}{" "}
                      {shippingAddress.street}
                      {shippingAddress.postalCode}
                    </Card.Text>
                    <Card.Text>{shippingAddress.fullAddress}</Card.Text>
                    <Card.Text>
                      Contact Number: {shippingAddress.contactNumber}
                    </Card.Text>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col
                style={{
                  width: "20rem",
                  display: "flex",
                  marginBottom: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <ListGroup>
                  <ListGroup.Item>
                    <Card.Text
                      style={{ fontSize: "2rem", textAlign: "center" }}
                    >
                      Order Summary
                    </Card.Text>
                    <hr></hr>
                    {cart.map((item, index) => (
                      <Row key={index}>
                        <Col
                          style={{
                            display: "flex",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <Card.Img
                            src={item.image}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <Card.Text
                            style={{
                              paddingLeft: "0.5rem",
                            }}
                          >
                            <strong> {item.name} </strong>(
                            {item.defaultCartStock} * {item.price} ={" "}
                            {(item.defaultCartStock * item.price).toFixed(2)})
                          </Card.Text>
                        </Col>
                        <hr></hr>
                      </Row>
                    ))}
                    <br></br>

                    <Card.Text
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Product Price: {price}₺
                    </Card.Text>

                    <Card.Text
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Shipping Price: 5₺
                    </Card.Text>
                    <hr></hr>
                    <Card.Text
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Total Price: <strong> {totalPrice} ₺</strong>
                    </Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default PaymentScreen;
