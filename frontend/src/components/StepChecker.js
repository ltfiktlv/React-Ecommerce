import React from "react";
import { Nav } from "react-bootstrap";

const StepChecker = ({ signIn, shippingAddress, overview, payment }) => {
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
        {overview ? (
          <Nav.Link href="/overview">
            <strong>Overview {"&"} Payment Method &gt;</strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Overview {"&"} Payment Method &gt;</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {payment ? (
          <Nav.Link href="/checkout">
            <strong>Checkout </strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Checkout</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default StepChecker;
