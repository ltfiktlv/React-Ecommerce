import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [isStatus, setIsStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios
      .post("/api/users/login", {
        email,
        password,
      })
      .catch((error) => {
        setError(error.response.data);
      });
    setIsStatus(JSON.stringify(response.status));
    setData(response.data);
  };
  useEffect(() => {
    if (data.name) {
      localStorage.setItem("user", JSON.stringify(data));

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  });

  return (
    <Card
      style={{ width: "27rem", height: "50vh" }}
      className="m-auto mt-5 p-3 rounded"
    >
      <span className="head mb-3">LOGIN</span>
      {isStatus === "200" ? (
        <Alert
          variant={"success"}
          style={{
            marginBottom: "0",
            marginLeft: "1.8rem",
            width: "22rem",
          }}
        >
          Welcome {data.name}!
        </Alert>
      ) : error ? (
        <Alert
          variant={"danger"}
          style={{
            marginBottom: "0",
            marginLeft: "1.8rem",
            width: "22rem",
          }}
        >
          {error}
        </Alert>
      ) : (
        " "
      )}
      <Card.Body className="Login pt-4 pb-0">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
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
          <div className="d-grid gap-2 pt-3">
            <Button variant="secondary" size="lg" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>

      <div className="signup">
        <span className="toSign">
          Not a member? &nbsp;
          <Link to="/users/register" style={{ textDecoration: "none" }}>
            {" "}
            <strong>Sign Up</strong>{" "}
          </Link>
        </span>
      </div>
    </Card>
  );
}
