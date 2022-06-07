import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
const Header = ({ quantity, handleQty }) => {
  useEffect(() => {
    handleQty();
  });
  const [userName, setUserName] = useState({});

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("user"));

    setUserName(response);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.reload();
  };

  return (
    <header>
      <Navbar
        className="py-4"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                letterSpacing: "0.1rem",
                fontSize: "1.5rem",
                textDecoration: "none",
                color: "white",
              }}
            >
              Savor Coffee <sup>&reg; </sup>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="me-2">
                  <span>
                    {" "}
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <span>
                    <strong>
                      <sup
                        style={{
                          color: "#00352b",
                          border: "1px solid white",
                          borderRadius: "0.2rem",
                          padding: "1px",
                          paddingRight: "1px",
                          backgroundColor: "white",
                          position: "relative",
                          top: "-15px",
                        }}
                      >
                        {quantity}
                      </sup>
                    </strong>
                  </span>
                  <span className="ms-1">Cart</span>
                </Nav.Link>
              </LinkContainer>
              {userName ? (
                <NavDropdown title={userName.name} id="username">
                  <LinkContainer to="/users/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/users/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login / Sign Up
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
