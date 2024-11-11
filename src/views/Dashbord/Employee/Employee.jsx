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
  Upload,
  Checkbox,
  Radio,
} from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    img: null, // This will store the image file itself
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8081/employee/get-employee")
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
      mobile: "",
      designation: "",
      gender: "",
      course: [],
      img: null, // Reset image field
    });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const openEditUserModal = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      designation: user.designation,
      gender: user.gender,
      course: user.course,
      img: user.img, // Make sure to retain the existing image URL or file
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
      mobile: "",
      designation: "",
      gender: "",
      course: [],
      img: null, // Reset image field on modal close
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
      designation: value,
    }));
  };

  // const filteredUsers = users.filter((user) => {
  //   return (
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.userType.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userType?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleCourseChange = (checkedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      course: checkedValues,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        img: file, // Store the file itself for later upload
      }));
    }
  };
  // Function to handle form submit for adding/editing employee
  // const handleFormSubmit = () => {
  //   // Create a new FormData instance
  //   const formDataWithImage = new FormData();

  //   // Append image if it exists in formData
  //   if (formData.img) {
  //     formDataWithImage.append("image", formData.img);
  //   }

  //   // Append other form data fields to FormData
  //   formDataWithImage.append("name", formData.name || "");
  //   formDataWithImage.append("email", formData.email || "");
  //   formDataWithImage.append("mobile", formData.mobile || "");
  //   formDataWithImage.append("designation", formData.designation || "");
  //   formDataWithImage.append("gender", formData.gender || "");
  //   formDataWithImage.append("course", JSON.stringify(formData.course || []));

  //   // Log formData to verify it has the correct data
  //   for (let pair of formDataWithImage.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }

  //   // Determine request method and URL for add/edit operation
  //   const requestMethod = isEditing ? axios.put : axios.post;
  //   const url = isEditing
  //     ? `http://localhost:8081/employee/edit-user/${selectedUserId}`
  //     : "http://localhost:8081/employee/add-employee";

  //   console.log("formDataWithImage", formDataWithImage);
  //   requestMethod(url, formDataWithImage, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then(() => {
  //       fetchUsers(); // Refresh user list
  //       closeModal(); // Close modal on success
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting form:", error);
  //     });
  // };
  // const handleFormSubmit = () => {
  //   // Ensure formData contains the necessary data
  //   const formDataWithImage = new FormData();

  //   // Append image if it exists in formData
  //   if (formData.img) {
  //     formDataWithImage.append("image", formData.img);
  //   }

  //   // Append other form data fields to FormData
  //   if (formData.name) formDataWithImage.append("name", formData.name);
  //   if (formData.email) formDataWithImage.append("email", formData.email);
  //   if (formData.mobile) formDataWithImage.append("mobile", formData.mobile);
  //   if (formData.designation)
  //     formDataWithImage.append("designation", formData.designation);
  //   if (formData.gender) formDataWithImage.append("gender", formData.gender);
  //   if (formData.course)
  //     formDataWithImage.append("course", JSON.stringify(formData.course));

  //   // Log the contents of formDataWithImage for debugging
  //   for (let pair of formDataWithImage.entries()) {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }

  //   // Determine request method and URL for add/edit operation
  //   const requestMethod = isEditing ? axios.put : axios.post;
  //   const url = isEditing
  //     ? `http://localhost:8081/employee/edit-user/${selectedUserId}`
  //     : "http://localhost:8081/employee/add-employee";

  //   // Submit the form data
  //   requestMethod(url, formDataWithImage, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then(() => {
  //       fetchUsers(); // Refresh the user list
  //       closeModal(); // Close the modal
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting form:", error);
  //     });
  // };

  // Example useEffect to populate formData when editing a user
  useEffect(() => {
    if (isEditing && selectedUserId) {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      if (selectedUser) {
        setFormData({
          name: selectedUser.name,
          email: selectedUser.email,
          mobile: selectedUser.mobile,
          designation: selectedUser.designation,
          gender: selectedUser.gender,
          course: selectedUser.course,
          img: selectedUser.img || null, // Only if image handling is required
        });
      }
    }
  }, [isEditing, selectedUserId]);

  const handleFormSubmit = () => {
    // Create formData with image and other form data
    const formDataWithImage = new FormData();
    if (formData.img) {
      formDataWithImage.append("image", formData.img); // Add the image file
    }

    // Add other form data to formDataWithImage
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("email", formData.email);
    formDataWithImage.append("mobile", formData.mobile);
    formDataWithImage.append("designation", formData.designation);
    formDataWithImage.append("gender", formData.gender);
    formDataWithImage.append("course", JSON.stringify(formData.course));
    console.log("formDataWithImage", formDataWithImage);
    const requestMethod = isEditing ? axios.put : axios.post;
    const url = isEditing
      ? `http://localhost:8081/employee/edit-user/${selectedUserId}`
      : "http://localhost:8081/employee/add-employee";

    requestMethod(url, formDataWithImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        fetchUsers();
        closeModal();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  // const handleFormSubmit = () => {
  //   // Create FormData with image and other form data
  //   const formDataWithImage = new FormData();

  //   // Check if there is an image file, and add it
  //   if (formData.img) {
  //     formDataWithImage.append("image", formData.img); // Add the image file
  //   }

  //   // Add other form data to FormData
  //   formDataWithImage.append("name", formData.name);
  //   formDataWithImage.append("email", formData.email);
  //   formDataWithImage.append("mobile", formData.mobile);
  //   formDataWithImage.append("designation", formData.designation);
  //   formDataWithImage.append("gender", formData.gender);
  //   formDataWithImage.append("course", JSON.stringify(formData.course));

  //   // Log formData to check its contents (needed to manually inspect FormData)
  //   for (let pair of formDataWithImage.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }

  //   // Determine the request method and URL based on the editing state
  //   const requestMethod = isEditing ? axios.put : axios.post;
  //   const url = isEditing
  //     ? `http://localhost:8081/employee/edit-user/${selectedUserId}`
  //     : "http://localhost:8081/employee/add-employee";

  //   // Send the request with formDataWithImage and appropriate headers
  //   requestMethod(url, formDataWithImage, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then(() => {
  //       fetchUsers(); // Refresh the users list after adding or updating
  //       closeModal(); // Close the modal after operation
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting form:", error);
  //     });
  // };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:8081/employee/delete-employee/${userId}`)
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // const usersData = users.map((user, index) => ({
  //   ...user,
  //   serialNumber: index + 1,
  // }));

  const usersData = filteredUsers.map((user, index) => ({
    ...user,
    serialNumber: index + 1,
  }));
  const userColumns = [
    { title: "S.No", dataIndex: "serialNumber", key: "serialNumber" },

    {
      title: "Img",
      dataIndex: "img",
      key: "img",
      render: (_, user) => {
        // Format the image path to replace backslashes with forward slashes
        const imagePath = user.img.replace(/\\/g, "/"); // Replace backslashes with forward slashes
        return (
          <Space size="middle">
            <img
              src={`http://localhost:8081/${imagePath}`} // Construct the full URL
              alt="User  Image"
              style={{ width: "50px", height: "50px", objectFit: "cover" }} // Optional styling
            />
          </Space>
        );
      },
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (_, user) => {
        let data = user.designation || "";
        data = data.toUpperCase(); // Convert to uppercase
        return (
          <Space size="middle">
            {data} {/* Display as a single uppercase string */}
          </Space>
        );
      },
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (_, user) => {
        // Initialize an empty string for course
        let course = "";

        if (Array.isArray(user.course) && user.course.length > 0) {
          try {
            const parsedCourse = JSON.parse(user.course[0]); // Parse the string inside the array
            if (Array.isArray(parsedCourse) && parsedCourse.length > 0) {
              course = parsedCourse[0].toUpperCase(); // Convert the first item to uppercase
            }
          } catch (error) {
            console.error("Error parsing course:", error);
          }
        }

        return (
          <Space size="middle">
            {course} {/* Display as a single uppercase string */}
          </Space>
        );
      },
    },

    // { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, user) => {
        const dateTime = user.createdAt.split("T"); // Split by 'T' to separate date and time
        const dateOnly = dateTime.splice(0, 1)[0]; // Use splice to get the date part only
        return dateOnly; // Return only the date part
      },
    },
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
          <h2>Employee List</h2>
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
            Create Employee
          </Button>
        </div>

        <Table columns={userColumns} dataSource={usersData} rowKey="_id" />

        <Modal
          title={isEditing ? "Edit Employee" : "Add Employee"}
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleFormSubmit}>
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
            <Form.Item label="Mobile No" required={!isEditing}>
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Designation" required>
              <Select
                options={[
                  { label: "HR", value: "hr" },
                  { label: "Manager", value: "manager" },
                  { label: "Sales", value: "sales" },
                ]}
                value={formData.designation}
                onChange={handleSelectChange}
              />
            </Form.Item>
            <Form.Item label="Gender" required>
              <Radio.Group
                value={formData.gender}
                onChange={handleGenderChange}
              >
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Course" required>
              <Checkbox.Group
                value={formData.course}
                onChange={handleCourseChange}
              >
                <Checkbox value="mca">MCA</Checkbox>
                <Checkbox value="bca">BCA</Checkbox>
                <Checkbox value="bsc">BSC</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Image Upload" required>
              <input type="file" onChange={handleImageChange} />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                style={{
                  backgroundColor: "#6aefc2",
                  borderRadius: "2rem",
                  width: "5rem",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                }}
                type="default"
                onClick={closeModal}
              >
                Reset
              </Button>
              <Button
                style={{
                  backgroundColor: "#6aefc2",
                  borderRadius: "2rem",
                  width: "5rem",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "#feccdc",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </Card>
    </DefaultLayout>
  );
};
export default Employee;
