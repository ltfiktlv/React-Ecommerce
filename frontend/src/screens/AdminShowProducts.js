import React, { useState, useEffect } from "react";
import { Card, Button, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminShowProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchUser = JSON.parse(localStorage.getItem("user")) || [];
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };
    fetchProducts();
  }, []);
  const handleDeleteProduct = async (id) => {
    let config = {
      headers: {
        authorization: `Bearer ${fetchUser.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);
    window.location.reload();
  };
  return (
    <Card>
      <Card.Body>
        <h1>Products</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <LinkContainer to={`/admin/createProduct`}>
            <Button>
              <i class="fa-solid fa-square-plus"></i>Create a Product
            </Button>
          </LinkContainer>
        </div>

        <Table>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>RATING</th>
              <th>REVIEWS </th>
              <th>PRICE </th>
              <th>IN STOCK</th>
              <th>CREATED</th>
              <th>UPDATED</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.rating}</td>
                <td>{product.numReviews}</td>
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.createdAt.substring(0, 10)}</td>
                <td>{product.updatedAt.substring(0, 10)}</td>

                <td>
                  <LinkContainer to={`/admin/product/edit/${product._id}`}>
                    <Button>
                      Edit <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AdminShowProducts;
