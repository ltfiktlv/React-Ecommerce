import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Card,
  ListGroup,
  Container,
  ListGroupItem,
  Form,
  Button,
  Alert,
  Nav,
} from "react-bootstrap";
import StepChecker from "../components/StepChecker";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
const CheckOutScreen = () => {
  const orderId = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
  const [isProcessing, setIsProcessing] = useState(false);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    let data = {};
    const { data: client_secret } = await axios.put(
      `/api/orders/${orderId.id}`,
      data,
      config
    );
    console.log(client_secret);
    if (client_secret) {
      setIsProcessing(true);
    }
  };

  useEffect(() => {
    if (paymentMethod === "Cash") {
      setTimeout(() => {
        navigate("/users/profile");
      }, 4000);
    }
  }, []);
  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <ListGroup>
          <ListGroupItem>
            <StepChecker signIn shippingAddress overview payment />
          </ListGroupItem>
        </ListGroup>
      </Container>

      <Card
        style={{ width: "40%", height: "30vh" }}
        className="m-auto p-3 rounded"
      >
        {paymentMethod === "Cash" ? (
          <Card.Body>
            <Alert variant={"success"}>Order Confirmed</Alert>
            <Form onSubmit={handleSubmit}>
              <ListGroup>
                <ListGroupItem>
                  <Card.Text>Order ID: {orderId.id}</Card.Text>
                </ListGroupItem>
                <ListGroupItem
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button type="submit">Check My Orders</Button>
                </ListGroupItem>
              </ListGroup>
            </Form>
          </Card.Body>
        ) : (
          <>
            {!isProcessing === true ? (
              <Card.Body>
                <Alert variant={"danger"}>Not Paid</Alert>
                <Form onSubmit={handleSubmit}>
                  <ListGroup>
                    <ListGroupItem>
                      <Card.Text>Order ID: {orderId.id}</Card.Text>
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
                <Form onSubmit={handleSubmit}>
                  <ListGroup>
                    <ListGroupItem>
                      <Card.Text>Order ID: {orderId.id}</Card.Text>
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
          </>
        )}
      </Card>
    </>
  );
};

export default CheckOutScreen;
