import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col
            className="text-center py-3"
            style={{
              border: "0 solid black",
              backgroundColor: "#f8f1e7",
              borderRadius: "5px",
              maxWidth: "16rem",
            }}
          >
            Copyright &copy; - SavorCoffee &reg;
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
