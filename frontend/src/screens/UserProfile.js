import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Table,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
  const [orders, setOrders] = useState([]);

  const fetchData = JSON.parse(localStorage.getItem("user")) || [];

  const fetchOrders = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userData.token}`,
      },
    };

    const respond = await axios.get(`/api/orders/myorders`, config);
    console.log(respond);
    setOrders(respond.data);
  };
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
    fetchOrders();
    console.log(`this is orders: ${orders}`);
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
          style={{
            height: "82vh",
          }}
        >
          <Row>
            <Col>
              <Card.Body
                className="Login pb-0"
                style={{
                  paddingTop: "2rem",

                  marginRight: "25rem",
                }}
              >
                <Container
                  style={{ marginLeft: "7.65rem", marginBottom: "1rem" }}
                >
                  <Card.Text
                    style={{
                      marginRight: "4rem",
                      fontSize: "2.5rem",
                      fontWeight: "bolder",
                    }}
                  >
                    PROFILE
                  </Card.Text>
                  <span>Easily update your name, email and password.</span>

                  {success ? (
                    <Alert
                      variant={"success"}
                      style={{
                        marginBottom: "0",

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

                        width: "22rem",
                      }}
                    >
                      {error}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Container>
                <Form onSubmit={handleSubmit} style={{ marginRight: "5rem" }}>
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
                  <Form.Group
                    size="lg"
                    controlId="newPassword"
                    className="mt-3"
                  >
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      placeholder="You can change your password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    size="lg"
                    controlId="verifyPassword"
                    className="mt-3"
                  >
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
            </Col>
            <Col>
              <Card.Body style={{ marginTop: "1rem", marginRight: "5rem" }}>
                <Card.Text
                  style={{
                    marginRight: "4rem",
                    fontSize: "2.5rem",
                    fontWeight: "bolder",
                  }}
                >
                  MY ORDERS
                </Card.Text>
                <Table>
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}₺</td>
                        <td>{order.paidAt.substring(0, 10)}</td>
                        <td>
                          <LinkContainer to={`/myorders/${order._id}`}>
                            <Button>Details</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
}
