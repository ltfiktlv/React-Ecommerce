import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";

export default function Login({ location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let storeName;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("/api/users/login", {
      email,
      password,
    });

    const storeData = response.data;
    storeName = storeData.name;
    console.log(storeData);
    if (storeData.name) {
      localStorage.setItem("user", JSON.stringify(storeData));
      alert("Login Successful");
      navigate("/");
      window.location.reload();
    } else {
      alert(storeData.err);
    }
  };
  useEffect(() => {
    if (storeName) {
      navigate("/", { replace: true });
    }
  }, [storeName, navigate]);
  return (
    <Card
      style={{ width: "27rem", height: "50vh" }}
      className="m-auto mt-5 p-3 rounded"
    >
      <span className="head">LOG IN</span>

      <Card.Body className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
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
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
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
