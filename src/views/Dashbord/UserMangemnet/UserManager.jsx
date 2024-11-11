import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../Defaultlayout/DefaultLayout";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Typography,
  Select,
} from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Alert } from "antd";

const UserManager = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8081/user/get-user")
      .then((response) => {
        const sortedUsers = response.data.user.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setUsers(sortedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const openAddUserModal = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      userType: "",
    });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const openEditUserModal = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      userType: user.userType,
    });
    setSelectedUserId(user._id);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      userType: "",
    });
    setSelectedUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      userType: value,
    }));
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:8081/user/edit-user/${selectedUserId}`, formData)
        .then(() => {
          fetchUsers(); // Refresh users list after update
          closeModal();
          setAlert(true);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      axios
        .post("http://localhost:8081/user/add-user", formData)
        .then(() => {
          fetchUsers(); // Refresh users list after adding
          closeModal();
          setAlert(true);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:8081/user/delete-user/${userId}`)
      .then(() => {
        fetchUsers(); // Refresh users list after deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const usersData = filteredUsers.map((user, index) => ({
    ...user,
    serialNumber: index + 1,
  }));

  const userColumns = [
    { title: "S.No", dataIndex: "serialNumber", key: "serialNumber" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "User Type", dataIndex: "userType", key: "userType" },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <Space size="middle">
          <Button
            onClick={() => openEditUserModal(user)}
            style={{ border: "1.5px solid orange" }}
            size="small"
          >
            <EditOutlined />
          </Button>
          <Button onClick={() => deleteUser(user._id)} danger size="small">
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Card style={{ width: "100%", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>User List</h2>
          <Input
            placeholder="Search by Name, Email or User Type"
            style={{ width: "400px", height: "40px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            style={{
              backgroundColor: "#feccdc",
              fontSize: "16px",
              color: "black",
              borderRadius: "10px",
            }}
            onClick={openAddUserModal}
          >
            Create User
          </Button>
        </div>

        <Table columns={userColumns} dataSource={usersData} rowKey="_id" />

        <Modal
          title={isEditing ? "Edit User" : "Add User"}
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleFormSubmit}>
            {alert === true && (
              <Alert
                message={isEditing ? "User Updated" : "User Added"}
                type="success"
              />
            )}

            <Form.Item label="Name" required>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Password" required={!isEditing}>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="User Type" required>
              <Select
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
                value={formData.userType}
                onChange={handleSelectChange}
              />
            </Form.Item>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Button
                style={{
                  borderRadius: "2rem",
                  width: "5rem",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "#6aefc2",
                }}
                onClick={() =>
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    userType: "",
                  })
                }
              >
                Reset
              </Button>
              <Form.Item>
                <Button
                  style={{
                    borderRadius: "2rem",
                    width: "5rem",
                    backgroundColor: "#feccdc",
                    color: "black",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  }}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </Card>
    </DefaultLayout>
  );
};
export default UserManager;
