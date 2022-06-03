import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import bcrypt from "bcryptjs";
export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = JSON.parse(localStorage.getItem("user")) || [];

  const [userData, setUserData] = useState(fetchData);
  useEffect(() => {
    setUserData(fetchData);

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
  }, [localStorage.user]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const match = await bcrypt.compare(password, userData.password);
    const hold = match;
    if (password !== verifyPassword) {
      setError("Password does not match");
    } else if (!hold) {
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
        password,
      };
      const res = await axios
        .put("/api/users/profile", data, config)
        .then(setSuccess("Profile Updated"))
        .catch((error) => setError(error.respond.data));

      const newLocal = res.data;

      localStorage.setItem("user", JSON.stringify(newLocal));

      window.location.reload();
    }
  };

  return (
    <>
      {text ? (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
            fontWeight: "bolder ",
            fontSize: "1.5rem",
          }}
        >
          {text} (401)
        </span>
      ) : (
        <Card
          style={{ width: "27rem", height: "70vh" }}
          className="m-auto mt-5 p-3 rounded"
        >
          <span className="head mb-2 ">PROFILE</span>

          {error ? (
            <Alert variant={"danger"} style={{ margin: "0" }}>
              {error}
            </Alert>
          ) : success ? (
            <Alert variant={"success"} style={{ margin: "0" }}>
              {success}
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
