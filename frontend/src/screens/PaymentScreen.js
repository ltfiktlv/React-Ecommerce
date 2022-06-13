import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import { useNavigate, useParams, Link } from "react-router-dom";
import StepChecker from "../components/StepChecker";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

const PaymentScreen = ({ price }) => {
  const orderId = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("CreditCard");
  const [isSuccess, setIsSuccess] = useState("");
  const [order, setOrder] = useState("");
  const [ordersId, setOrdersId] = useState("");
  const shippingPrice = 5;
  const totalPrice = Number(price) + shippingPrice;
  const shoppingCart = cart;
  const itemsPrice = price;
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  const userInfo = JSON.parse(localStorage.getItem("user"));

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
    await axios
      .post("/api/orders", data, config)
      .then(() => setIsSuccess("success"))
      .catch((error) => setIsSuccess(error));
  };

  useEffect(() => {
    if (isSuccess === "success") {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const fetchOrder = async () => {
        const { data } = await axios.get("/api/orders", config);

        setOrder(data);
        const lastOrder = data.length - 1;
        let navigateAddress = data[lastOrder]._id;
        setOrdersId(navigateAddress);
      };
      fetchOrder();
    } else {
      console.log(isSuccess);
    }
  }, [isSuccess]);
  useEffect(() => {
    ordersId ? console.log(ordersId) : console.log(ordersId);
  }, [ordersId.id]);
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "20px",

        fontWeight: "500",
        fontFamily: "Montserrat",
        "::placeholder": {
          color: "#87bbfd ",
        },
      },
      invalid: {},
    },
    hidePostalCode: true,
  };
  const handleCheckOut = async (event) => {
    event.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    let data = {};
    console.log(`id:${ordersId}`);
    const { data: client_secret } = await axios.put(
      `/api/orders/${ordersId}`,
      data,
      config
    );

    if (client_secret) {
      setIsProcessing(true);
    }
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
        style={{ width: "55%", height: "90vh" }}
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
                            {item.defaultCartStock > item.countInStock
                              ? item.countInStock
                              : item.defaultCartStock}{" "}
                            * {item.price}₺ ={" "}
                            {item.defaultCartStock > item.countInStock
                              ? (item.price * item.countInStock).toFixed(2)
                              : (item.price * item.defaultCartStock).toFixed(2)}
                            ₺)
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
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    style={{ marginLeft: "7rem" }}
                    disabled={isSuccess === "success"}
                  >
                    Continue
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        )}

        {isSuccess ? (
          <div>
            {!isProcessing === true ? (
              <Card.Body>
                <Alert variant={"danger"}>Not Paid</Alert>
                <Form onSubmit={handleCheckOut}>
                  <ListGroup>
                    <ListGroupItem>
                      <Card.Text>Order ID: {ordersId}</Card.Text>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Elements stripe={stripePromise}>
                        <CardElement options={cardElementOptions} />
                      </Elements>
                    </ListGroupItem>
                    <ListGroupItem
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button type="submit">Pay</Button>
                    </ListGroupItem>
                  </ListGroup>
                </Form>
              </Card.Body>
            ) : (
              <Card.Body>
                <Alert variant={"success"}>Order Confirmed</Alert>
                <Form onSubmit={handleCheckOut}>
                  <ListGroup>
                    <ListGroupItem>
                      <Card.Text>Order ID: {ordersId}</Card.Text>
                    </ListGroupItem>
                    <ListGroupItem
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Link to="/users/profile">
                        <Button>Check My Orders</Button>
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </Form>
              </Card.Body>
            )}
          </div>
        ) : (
          <div> </div>
        )}
      </Card>
    </>
  );
};

export default PaymentScreen;
