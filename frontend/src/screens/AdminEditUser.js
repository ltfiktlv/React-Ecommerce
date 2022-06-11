import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import bcrypt from "bcryptjs";
import { LinkContainer } from "react-router-bootstrap";
const AdminEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchAdmin = JSON.parse(localStorage.getItem("user")) || [];
  const [user, setUser] = useState([]);
  const userId = useParams();
  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${fetchAdmin.token}`,
      },
      data: "",
    };
    const fetchUser = async () => {
      const respond = await axios.get(`/api/users/${userId.id}`, config);
      const holdData = respond.data;
      setUser(holdData);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const match = await bcrypt.compare(password, fetchAdmin.password);
    if (!match) {
      setError("Invalid Password");
    } else {
      let config = {
        headers: {
          authorization: `Bearer ${fetchAdmin.token}`,
        },
      };
      let data = {
        name,
        email,
        isAdmin,
      };
      await axios
        .put(`/api/users/${userId.id}`, data, config)
        .then(setSuccess("Profile Updated"))
        .catch((error) => setError(error.respond.data));
      window.location.reload();
    }
  };
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  }, [user]);
  return (
    <>
      {fetchAdmin.isAdmin ? (
        <Card
          style={{
            height: "70vh",
            width: "50rem",
            margin: "auto",
            marginTop: "3rem",
          }}
        >
          {!localStorage.getItem("user") ? (
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          ) : (
            <Card.Body
              className="Login pb-0"
              style={{
                paddingTop: "2rem",
              }}
            >
              <Container>
                <Card.Text
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bolder",
                    marginLeft: "11rem",
                    paddingBottom: "2rem",
                  }}
                >
                  EDIT USER PROFILE
                </Card.Text>

                {success ? (
                  <Alert
                    variant={"success"}
                    style={{
                      marginBottom: "0",
                      marginLeft: "14rem",
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
                      marginLeft: "14rem",
                      width: "22rem",
                    }}
                  >
                    {error}
                  </Alert>
                ) : (
                  ""
                )}
              </Container>
              <Form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
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
                <Form.Group size="lg" controlId="isAdmin" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="isAdmin"
                    name="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => {
                      setIsAdmin(e.target.checked);
                    }}
                  ></Form.Check>
                </Form.Group>
                <Card.Footer className="mt-3">
                  <Form.Group size="lg" controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      required
                      placeholder="Admin password"
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
              <Container style={{ marginLeft: "5rem", marginTop: "3.5rem" }}>
                <LinkContainer to={`/admin/users`}>
                  <Button> {"<"}User List</Button>
                </LinkContainer>
              </Container>
            </Card.Body>
          )}
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>Error! You Are Not Authorized.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AdminEditUser;
