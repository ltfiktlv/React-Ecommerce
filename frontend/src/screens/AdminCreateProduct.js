import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import bcrypt from "bcryptjs";
import { LinkContainer } from "react-router-bootstrap";
const AdminCreateProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchAdmin = JSON.parse(localStorage.getItem("user")) || [];

  const navigate = useNavigate();
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
    } catch (error) {
      console.log(error);
    }
  };
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
        category,
        image,
        price,
        countInStock: inStock,
        description,
      };
      await axios
        .post(`/api/products/new-product`, data, config)
        .then(setSuccess("Product Created"))
        .catch((error) => setError(error.respond.data));
      navigate("/admin/products");
    }
  };

  return (
    <>
      {fetchAdmin.isAdmin ? (
        <Card
          style={{
            height: "110vh",
            width: "80rem",
            margin: "auto",
            marginTop: "3rem",
          }}
        >
          {!localStorage.getItem("cart") ? (
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
                    marginLeft: "29rem",
                    paddingBottom: "2rem",
                  }}
                >
                  ADD NEW PRODUCT
                </Card.Text>

                {success ? (
                  <Alert
                    variant={"success"}
                    style={{
                      marginBottom: "0",
                      marginLeft: "29rem",
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
                      marginLeft: "29rem",
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
                <Form.Group size="lg" controlId="category" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="category"
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="price" className="mt-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="price"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="inStock" className="mt-3">
                  <Form.Label>In Stock</Form.Label>
                  <Form.Control
                    type="inStock"
                    value={inStock}
                    required
                    onChange={(e) => setInStock(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" className="mt-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    label="Choose Image"
                    required
                    onChange={handleImageUpload}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="description" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                    Create Product
                  </Button>
                </div>
              </Form>
              <Container style={{ marginLeft: "5rem", marginTop: "3.5rem" }}>
                <LinkContainer to={`/admin/products`}>
                  <Button> {"<"}Product List</Button>
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

export default AdminCreateProduct;
