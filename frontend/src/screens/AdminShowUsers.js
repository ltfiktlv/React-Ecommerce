import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function AdminShowUsers() {
  const fetchUser = JSON.parse(localStorage.getItem("user")) || [];
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${fetchUser.token}`,
      },
      data: "",
    };
    const fetchUsers = async () => {
      const respond = await axios.get("/api/users", config);
      const holdData = respond.data;
      setUserList(holdData);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    let config = {
      headers: {
        authorization: `Bearer ${fetchUser.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);
    window.location.reload();
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <h1>Users</h1>
          <Table>
            <thead>
              <tr>
                <th>USER ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>CREATED</th>
                <th>UPDATED</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "green" }}
                      />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>{user.updatedAt.substring(0, 10)}</td>
                  <td>
                    <LinkContainer to={`/admin/user/edit/${user._id}`}>
                      <Button>
                        Edit <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button onClick={() => handleDeleteUser(user._id)}>
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
    </div>
  );
}
