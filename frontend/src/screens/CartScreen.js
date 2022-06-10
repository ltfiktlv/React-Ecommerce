import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

import "./CartScreen.css";
const Cart = ({
  cart,
  handleChange,
  handleRemove,
  handlePrice,
  price,
  quantity,
}) => {
  useEffect(() => {
    handlePrice();
  });
  const navigate = useNavigate();

  const isLoggedIn = () => {
    if (localStorage.getItem("user")) {
      navigate("/address");
    } else {
      navigate(`/users/login?redirect=address`); //it will direct to the login screen if user log-in it will redirect to the order screen
    }
  };

  return (
    <>
      <Card
        style={{
          width: "70%",
          height: "70vh",
          margin: "auto",
          marginTop: "3rem",
        }}
      >
        <Card.Header className="text-center" style={{ fontSize: "1.5rem" }}>
          MY CART ({quantity} Products){" "}
        </Card.Header>
        {cart.length === 0 && (
          <Card.Body
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Text>
              <strong>Shopping cart is empty.</strong>
            </Card.Text>
          </Card.Body>
        )}
        {cart.map((item, index) => (
          <Card.Body className="cart_box" key={index}>
            <Link
              to={`/product/${item._id}`}
              style={{
                textDecoration: "none",
                width: "15rem",
                display: "flex",
              }}
            >
              <Card.Img src={item.image} alt={item.name} />
              <Card.Text
                style={{
                  fontWeight: "bolder",
                  paddingTop: "0.7rem",
                  marginLeft: "1rem",
                }}
              >
                {item.name}
              </Card.Text>
            </Link>
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0.8rem",
              }}
            >
              <Button onClick={() => handleChange(item, 1)}>+</Button>
              <Button>
                {item.defaultCartStock >= item.countInStock
                  ? item.countInStock
                  : item.defaultCartStock}
              </Button>
              <Button onClick={() => handleChange(item, -1)}>-</Button>
            </Card.Body>
            <Card.Body
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Card.Text style={{ marginTop: "1rem", paddingLeft: "5rem" }}>
                <strong>
                  {(item.price * item.defaultCartStock).toFixed(2)}₺
                </strong>
              </Card.Text>
              <Button
                onClick={() => handleRemove(item._id)}
                style={{ marginBottom: "0.8rem" }}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>Remove
              </Button>
            </Card.Body>
          </Card.Body>
        ))}
        <Card.Footer className="total">
          <span>Total Product Price : {price}₺</span>
        </Card.Footer>
        <div
          style={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "space-between",
            padding: "1.5rem 1rem",
          }}
        >
          <Link to="/">
            <Button variant="secondary " type="button">
              Main Page
            </Button>
          </Link>

          <button id="orderbtn" disabled={quantity === 0} onClick={isLoggedIn}>
            Continue
          </button>
        </div>
      </Card>
    </>
  );
};

export default Cart;
