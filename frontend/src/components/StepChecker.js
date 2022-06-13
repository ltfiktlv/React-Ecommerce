import React from "react";
import { Nav } from "react-bootstrap";

const StepChecker = ({ signIn, shippingAddress, payment }) => {
  return (
    <Nav>
      <Nav.Item>
        {signIn ? (
          <Nav.Link href="/users/login">
            <strong>Login &gt;</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Login &gt;</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {shippingAddress ? (
          <Nav.Link href="/address">
            <strong>Shipping Address &gt;</strong>{" "}
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping Address &gt;</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {payment ? (
          <Nav.Link href="/payment">
            <strong>Overview {"&"} Checkout</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Overview {"&"}Checkout</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default StepChecker;
