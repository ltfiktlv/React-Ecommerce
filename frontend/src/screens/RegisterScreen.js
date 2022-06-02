import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  let storeName;
  let errorMessage;
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== verifyPassword) {
      setText("Password does not match");
    } else {
      await axios.post("/api/users/register", { name, email, password });
    }
  };
  useEffect(() => {
    if (storeName) {
      navigate("/users/login", { replace: true });
    }
  }, [storeName, navigate]);
  return (
    <Card
      style={{ width: "27rem", height: "64vh" }}
      className="m-auto mt-5 p-3 rounded"
    >
      <span className="head">SIGN UP</span>
      {text ? (
        <Alert variant={"danger"}>{text}!</Alert>
      ) : (
        <Alert variant={"danger"}>{text}!</Alert>
      )}
      <Card.Body className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="verifyPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
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
