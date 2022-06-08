import React from "react";
import { Card, ListGroup, Container, ListGroupItem } from "react-bootstrap";
import StepChecker from "../components/StepChecker";

const CheckOutScreen = () => {
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
        style={{ width: "70%", height: "78vh" }}
        className="m-auto p-3 rounded"
      >
        <Card.Body></Card.Body>
      </Card>
    </>
  );
};

export default CheckOutScreen;
