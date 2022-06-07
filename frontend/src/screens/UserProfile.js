import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import bcrypt from "bcryptjs";
export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = JSON.parse(localStorage.getItem("user")) || [];

  const [userData, setUserData] = useState(fetchData);
  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .get(`/api/users/profile`, config)
      .then(() => {
        setName(userData.name);
        setEmail(userData.email);
      })
      .catch((error) => setText(error.response.data));
  }, [userData.token, userData.name, userData.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const match = await bcrypt.compare(password, userData.password);
    if (newPassword !== verifyPassword) {
      setError("Passwords do not match");
    } else if (!match) {
      setError("Invalid Password");
    } else {
      let config = {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
      };
      let data = {
        name,
        email,
        newPassword,
      };
      const res = await axios
        .put("/api/users/profile", data, config)
        .then(setSuccess("Profile Updated"))
        .catch((error) => setError(error.respond.data));

      const newLocal = res.data;
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(newLocal));

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <>
      {text ? (
        <span
          style={{
            color: "black",
            border: "0 solid black",
            backgroundColor: "#f8f1e7",
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
            fontWeight: "bolder ",
            fontSize: "1.5rem",
          }}
        >
          {text}
        </span>
      ) : (
        <Card
          style={{ width: "27rem", height: "78vh" }}
          className="m-auto mt-5 p-3 rounded"
        >
          <span className="head mb-2 ">PROFILE</span>
          <span
            style={{
              marginLeft: "2rem",
              paddingBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Easily update your name, email and password.
          </span>
          {success ? (
            <Alert
              variant={"success"}
              style={{
                marginBottom: "0",
                marginLeft: "1.8rem",
                width: "22rem",
              }}
            >
              {success}
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
            ""
          )}

          <Card.Body className="Login pb-0" style={{ paddingTop: "1.5rem" }}>
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
              <Form.Group size="lg" controlId="newPassword" className="mt-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  placeholder="You can change your password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="verifyPassword" className="mt-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={verifyPassword}
                  required
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </Form.Group>
              <Card.Footer className="mt-3">
                <Form.Group size="lg" controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    required
                    placeholder="Currently used password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Card.Footer>
              <div className="d-grid gap-2">
                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  style={{ marginTop: "1.5rem" }}
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
