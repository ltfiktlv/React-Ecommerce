import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = ({ quantity, handleQty }) => {
  useEffect(() => {
    handleQty();
  });
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
          <Navbar.Brand
            href="/"
            style={{ letterSpacing: "0.1rem", fontSize: "1.5rem" }}
          >
            Savor Coffee <sup>&reg; </sup>
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
                          color: "#f3969a",
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
              <LinkContainer to="/users/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Log In / Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
