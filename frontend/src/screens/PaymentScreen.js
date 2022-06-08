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
  const [paymentMethod, setPaymentMethod] = useState("CreditCard");
  const [isSuccess, setIsSuccess] = useState("");
  const [order, setOrder] = useState("");
  const shippingPrice = 5;
  const totalPrice = Number(price) + shippingPrice;
  const shoppingCart = cart;
  const itemsPrice = price;
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const paymentApi = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(
      "/api/isbank/v1/product-fees?product_code=0001-99999&criteria_code=criteria_1",
      config
    );
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      itemsPrice: itemsPrice,
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
            <StepChecker signIn shippingAddress overview />
          </ListGroupItem>
        </ListGroup>
      </Container>

      <Card
        style={{ width: "55%", height: "63vh" }}
        className="m-auto p-3 rounded"
      >
        {!localStorage.getItem("user") ? (
          navigate("/users/login?redirect=address")
        ) : (
          <Card.Body className="pb-0" style={{ paddingTop: "1rem" }}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  marginBottom: "1rem",
                  justifyContent: "flex-start",
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
                    <Card.Text>Name-Surname: {userInfo.name}</Card.Text>
                    <Card.Text>
                      Province/District: {shippingAddress.city}/
                      {shippingAddress.district}{" "}
                    </Card.Text>
                    <Card.Text>
                      Street: {shippingAddress.street} &nbsp; Postal Code:
                      {shippingAddress.postalCode}
                    </Card.Text>
                    <Card.Text>
                      Building name/number: {shippingAddress.fullAddress}
                    </Card.Text>
                    <Card.Text>
                      Contact Number: {shippingAddress.contactNumber}
                    </Card.Text>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <Card.Text
                      style={{ fontSize: "1.5rem", textAlign: "center" }}
                    >
                      My Cart
                    </Card.Text>
                    <hr></hr>
                    {cart.map((item, index) => (
                      <Row key={index}>
                        <Col
                          className="items2"
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
                            {item.defaultCartStock} * {item.price}₺ ={" "}
                            {(item.defaultCartStock * item.price).toFixed(2)}₺)
                          </Card.Text>
                        </Col>
                        <hr></hr>
                      </Row>
                    ))}
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
                      Total Price:&nbsp; <strong> {totalPrice}₺</strong>
                    </Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Form.Label as="legend">Payment Method</Form.Label>
                        <Form.Check
                          checked
                          type="radio"
                          label="Credit Card"
                          name="paymentMethod"
                          value="CreditCard"
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
                  <Button type="submit" style={{ marginLeft: "7rem" }}>
                    Continue
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default PaymentScreen;
