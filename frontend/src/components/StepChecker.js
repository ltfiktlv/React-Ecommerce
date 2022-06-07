import React from "react";
import { Nav } from "react-bootstrap";

const StepChecker = ({ signIn, shippingAddress, payment, summary }) => {
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
            <strong>Payment {"&"} Place Order </strong>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment {"&"} Place Order </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default StepChecker;
