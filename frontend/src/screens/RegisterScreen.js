import axios from "axios";
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== verifyPassword) {
      setError("Password does not match");
    } else {
      const response = await axios
        .post("/api/users/register", { name, email, password })
        .catch((error) => {
          setError(error.response.data);
        });
      setIsStatus(JSON.stringify(response.status));
      setTimeout(() => {
        navigate("/users/login");
      }, 4000);
    }
  };

  return (
    <Card
      style={{ width: "27rem", height: "70vh" }}
      className="m-auto mt-5 p-3 rounded"
    >
      <span className="head mb-2 ">SIGN UP</span>
      <span style={{ paddingLeft: "2rem", marginBottom: "1.5rem" }}>
        It's fast and easy.
      </span>
      {isStatus === "201" ? (
        <Alert variant={"success"} style={{ margin: "0" }}>
          Success! You are redirecting to Login Page...
        </Alert>
      ) : error ? (
        <Alert variant={"danger"} style={{ margin: "0" }}>
          {error}
        </Alert>
      ) : (
        ""
      )}

      <Card.Body className="Login pb-0" style={{ paddingTop: "2rem" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="verifyPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={verifyPassword}
              required
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </Card.Body>
      <div className="signup">
        <span className="toSign">
          Already a member? &nbsp;
          <Link to="/users/login" style={{ textDecoration: "none" }}>
            {" "}
            <strong>Log In</strong>{" "}
          </Link>
        </span>
      </div>
    </Card>
  );
}
