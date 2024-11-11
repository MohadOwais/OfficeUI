import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import Mylogo from "../../../photos/Mylogo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const [fromdata, setFormdata] = useState({
//     email: "",
//     password: "",
//   });
//   const handleSubmit=(e)=>{

//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormdata((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
//         <Col>
//           <Card
//             style={{
//               width: 300,
//               textAlign: "center",
//               boxShadow: "0px 4px 8px #ff7ba5",
//             }}
//           >
//             <img src={Mylogo} alt="Logo" style={{ width: "150px" }} />
//             <Form>
//               <Form.Item
//                 label="Email"
//                 required
//                 style={{ marginBottom: 5 }}
//               ></Form.Item>
//               <Input
//                 style={{ width: "100%", height: 40 }}
//                 value={fromdata.email}
//                 name="email"
//                 onChange={handleInputChange}
//               />
//               <Form.Item
//                 label="Password"
//                 required
//                 style={{ marginBottom: 5 }}
//               ></Form.Item>
//               <Input
//                 style={{ width: "100%", height: 40 }}
//                 value={fromdata.password}
//                 name="password"
//                 onChange={handleInputChange}
//               />
//               <Button
//                 style={{
//                   backgroundColor: "#feccdc",
//                   fontSize: "16px",
//                   color: "black",
//                   marginTop: "1.5rem",
//                   borderRadius: "10px",
//                   width: "100%",
//                   height: "2.5rem",
//                 }}
//               >
//                 Submit
//               </Button>
//             </Form>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent page refresh

  //   // Add validation and submission logic here
  //   if (!formData.email || !formData.password) {
  //     alert("Please fill in both fields."); // Simple client-side validation
  //     return;
  //   }

  //   // Example: API call to login endpoint
  //   console.log("Form data submitted:", formData);

  //   // Reset form after submission if needed
  //   setFormData({ email: "", password: "" });
  // };
  const handleSubmit = (email, password) => {
    axios
      .post("http://localhost:8081/Login/login", formData)
      .then((response) => {
        if (response.status === 200) {
          // Store the user's name in localStorage
          localStorage.setItem("userName", response.data.name);
          localStorage.setItem("id", response.data.id);
          // alert(response.data.message);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message); // Displays specific error message
        } else {
          console.error("An error occurred:", error);
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card
            style={{
              width: 300,
              textAlign: "center",
              boxShadow: "0px 4px 8px #ff7ba5",
            }}
          >
            <img src={Mylogo} alt="Logo" style={{ width: "150px" }} />
            <Form onFinish={handleSubmit}>
              <Form.Item
                label="Email"
                required
                style={{ marginBottom: 5 }}
              ></Form.Item>
              <Input
                style={{ width: "100%", height: 40 }}
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <Form.Item
                label="Password"
                required
                style={{ marginBottom: 5 }}
              ></Form.Item>
              <Input
                style={{ width: "100%", height: 40 }}
                value={formData.password}
                name="password"
                type="password"
                onChange={handleInputChange}
              />
              <Button
                style={{
                  backgroundColor: "#feccdc",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "1.5rem",
                  borderRadius: "10px",
                  width: "100%",
                  height: "2.5rem",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
