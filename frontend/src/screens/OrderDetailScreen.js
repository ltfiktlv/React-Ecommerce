import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetailScreen = ({ price }) => {
  const navigate = useNavigate();
  let orderId = useParams();
  const [order, setOrder] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const respond = await axios.get(`/api/myorders/${orderId.id}`, config);
      const holdData = respond.data;
      console.log(holdData);
      setOrder(respond.data);
      holdData.map((order) =>
        order._id === orderId.id ? setOrder(order) : console.log(order)
      );
      console.log(`this is order fetch:${order}`);
    };

    fetchOrders();
  }, []);

  return (
    <>
      {order._id ? (
        <Card
          style={{ width: "55%", height: "63vh" }}
          className="m-auto p-3 rounded"
        >
          {!localStorage.getItem("user") && !order._id ? (
            navigate("/users/login?redirect=address")
          ) : (
            <Card.Body className="pb-0" style={{ paddingTop: "1rem" }}>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    marginBottom: "1rem",
                    justifyContent: "flex-start",
                  }}
                >
                  <ListGroup>
                    <ListGroupItem>
                      <Card.Text
                        style={{ fontSize: "1.5rem", textAlign: "center" }}
                      >
                        Shipping Details
                      </Card.Text>
                      <hr></hr>
                      <Card.Text>Name-Surname: {userInfo.name}</Card.Text>
                      <Card.Text>
                        Province/District: {order.shippingAddress.city}/
                        {order.shippingAddress.district}{" "}
                      </Card.Text>
                      <Card.Text>
                        Street: {order.shippingAddress.street} &nbsp; Postal
                        Code:
                        {order.shippingAddress.postalCode}
                      </Card.Text>
                      <Card.Text>
                        Building name/number:{" "}
                        {order.shippingAddress.fullAddress}
                      </Card.Text>
                      <Card.Text>
                        Contact Number: {order.shippingAddress.contactNumber}
                      </Card.Text>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroupItem>
                      <Card.Text
                        style={{ fontSize: "1.5rem", textAlign: "center" }}
                      >
                        My Cart
                      </Card.Text>
                      <hr></hr>
                      {order.orderItems.map((item, index) => (
                        <Row key={index}>
                          <Col
                            className="items2"
                            style={{
                              display: "flex",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <Card.Img
                              src={item.image}
                              style={{ width: "40px", height: "40px" }}
                            />
                            <Card.Text
                              style={{
                                paddingLeft: "0.5rem",
                              }}
                            >
                              <strong> {item.name} </strong>(
                              {item.defaultCartStock} * {item.price}₺ ={" "}
                              {(item.defaultCartStock * item.price).toFixed(2)}
                              ₺)
                            </Card.Text>
                          </Col>
                          <hr></hr>
                        </Row>
                      ))}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col
                  style={{
                    width: "20rem",
                    display: "flex",
                    marginBottom: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <ListGroup>
                    <ListGroup.Item>
                      <Card.Text
                        style={{ fontSize: "2rem", textAlign: "center" }}
                      >
                        Order Summary
                      </Card.Text>
                      <hr></hr>

                      <br></br>

                      <Card.Text
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        Product Price: {order.itemsPrice}₺
                      </Card.Text>

                      <Card.Text
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        Shipping Price: 5₺
                      </Card.Text>
                      <hr></hr>
                      <Card.Text
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        Total Price:&nbsp; <strong> {order.totalPrice}₺</strong>
                      </Card.Text>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          )}
        </Card>
      ) : (
        <div>fetching data...</div>
      )}
    </>
  );
};

export default OrderDetailScreen;