import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StepChecker from "../components/StepChecker";
const ShippingAddressScreen = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();
  const handleOrder = (event) => {
    event.preventDefault();
    setShippingAddress({
      fullAddress: fullAddress,
      city: city,
      district: district,
      street: street,
      postalCode: postalCode,
      contactNumber: contactNumber,
    });
  };
  useEffect(() => {
    if (shippingAddress) {
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
      localStorage.getItem("cart");
      navigate("/overview");
    }
  });

  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <ListGroup>
          <ListGroupItem>
            <StepChecker signIn shippingAddress />
          </ListGroupItem>
        </ListGroup>
      </Container>

      <Card
        style={{ width: "27rem", height: "78vh" }}
        className="m-auto p-3 rounded"
      >
        <span className="head mb-2 ">SHIPPING ADDRESS</span>
        {!localStorage.getItem("user") ? (
          navigate("/users/login?redirect=address")
        ) : (
          <Card.Body className="Login pb-0" style={{ paddingTop: "2rem" }}>
            <Form onSubmit={handleOrder}>
              <Form.Group size="lg" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  autoFocus
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
              <Form.Group size="lg" controlId="fullAddress" className="mt-3">
                <Form.Label>Detailed Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Detailed address with building name, floor, door number"
                  type="fullAddress"
                  value={fullAddress}
                  required
                  onChange={(e) => setFullAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="fullAddress" className="mt-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="contactNumber"
                  value={contactNumber}
                  required
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="secondary" size="lg" type="submit">
                  Continue
                </Button>
              </div>
            </Form>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default ShippingAddressScreen;
