import React, { useState, useEffect } from "react";
import { Card, Button, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

const AdminShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [success, setSuccess] = useState();
  const fetchUser = JSON.parse(localStorage.getItem("user")) || [];
  useEffect(() => {
    const fetchOrders = async () => {
      let config = {
        headers: {
          authorization: `Bearer ${fetchUser.token}`,
        },
      };
      const { data } = await axios.get("/api/orders/adminOrders", config);
      setOrders(data);
    };
    fetchOrders();
  }, []);
  const deliverHandler = async (orderId) => {
    let config = {
      headers: {
        authorization: `Bearer ${fetchUser.token}`,
      },
    };
    await axios
      .put(`/api/orders/deliver/${orderId}`, config)
      .then(() => setSuccess(true))
      .catch((err) => setSuccess(false));
    if (success === true) {
      window.location.reload();
    }
  };
  return (
    <Card>
      {fetchUser.isAdmin ? (
        <Card.Body>
          <h1>Orders</h1>

          <Table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>USER ID</th>
                <th>USER NAME</th>
                <th>PRICE </th>
                <th>PAID</th>
                <th>ORDERED AT</th>
                <th>DELIVERED</th>
                <th>DELIVERED AT</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "green" }}
                      />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>{order.updatedAt.substring(0, 10)}</td>

                  <td>
                    {order.isDelivered ? (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "green" }}
                      />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>

                  <td>
                    {order.deliveredAt
                      ? order.deliveredAt.substring(0, 10)
                      : ""}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button>
                        Order Details <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      onClick={() => deliverHandler(order._id)}
                      disabled={
                        !order.isPaid
                          ? true
                          : false || order.isDelivered
                          ? true
                          : false
                      }
                    >
                      Mark as Delivered <i class="fas fa-shipping-fast"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      ) : (
        <Card.Body>
          <Card.Text>You are not authorized.</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default AdminShowOrders;
