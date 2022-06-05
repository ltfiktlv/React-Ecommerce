import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
const OrderScreen = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  return (
    <Card
      style={{ width: "27rem", height: "70vh" }}
      className="m-auto mt-5 p-3 rounded"
    >
      <span className="head mb-2 ">SHIPPING ADDRESS</span>
      <Card.Body className="Login pb-0" style={{ paddingTop: "2rem" }}>
        <Form>
          <Form.Group size="lg" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              autoFocus
              type="address"
              value={fullAddress}
              required
              onChange={(e) => setFullAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="city" className="mt-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="district" className="mt-3">
            <Form.Label>District</Form.Label>
            <Form.Control
              type="district"
              value={district}
              required
              onChange={(e) => setDistrict(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="street" className="mt-3">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="street"
              value={street}
              required
              onChange={(e) => setStreet(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="postalCode" className="mt-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="postalCode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" type="submit">
              Order
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default OrderScreen;
