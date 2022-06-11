import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col className="footerbar">Copyright &copy; - SavorCoffee &reg;</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
