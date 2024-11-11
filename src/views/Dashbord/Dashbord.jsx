import React, { useEffect, useState } from "react";
import DefaultLayout from "../../Defaultlayout/DefaultLayout";
import { Card, Col, Row, Typography } from "antd";
import Employee from "../../photos/Employee.jpg";
import User from "../../photos/User.jpg";
import {
  Area,
  Bar,
  Column,
  Funnel,
  Heatmap,
  Line,
  Pie,
  Radar,
  Scatter,
  Waterfall,
} from "@ant-design/charts";
import axios from "axios";

const Dashbord = () => {
  const [users, setUsers] = useState([]);
  const [dataOfUser, setDataOfUser] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchUsersdata();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8081/employee/get-employee")
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const fetchUsersdata = () => {
    axios
      .get("http://localhost:8081/user/get-user")
      .then((response) => {
        setDataOfUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const getDesignationCount = () => {
    const count = {};
    users.forEach((user) => {
      const designation = user.designation;
      count[designation] = (count[designation] || 0) + 1;
    });

    return Object.keys(count).map((key) => ({
      category: key,
      value: count[key],
    }));
  };

  const getCourseCount = () => {
    const count = {};
    users.forEach((user) => {
      const course = JSON.parse(user.course)[0]; // Assuming course is an array in string form like '["bca"]'
      count[course] = (count[course] || 0) + 1;
    });

    return Object.keys(count).map((key) => ({
      category: key.toUpperCase(),
      value: count[key],
    }));
  };

  const designationData = getDesignationCount();
  const courseData = getCourseCount();

  const configDesignation = {
    data: designationData,
    xField: "category",
    yField: "value",
    colorField: "category",
    label: {
      style: {
        fontSize: 20,
      },
    },
    legend: { position: "bottom-left" },
  };

  const configCourse = {
    data: courseData,
    xField: "category",
    yField: "value",
    colorField: "category",
    label: {
      style: {
        fontSize: 20,
      },
    },
    legend: { position: "bottom-left" },
  };

  return (
    <DefaultLayout>
      <div style={{ padding: "2rem" }}>
        <Row gutter={[16, 16]}>
          <Col sm={24} lg={12} xs={24} xl={12}>
            <Card
              style={{
                width: "100%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img src={Employee} style={{ width: "200px" }} />
                <Card
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#ff90a3",
                  }}
                >
                  <Typography
                    style={{
                      // marginBottom: "5rem",
                      textAlign: "center",
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "#222a4f",
                    }}
                  >
                    {users.length}
                  </Typography>
                </Card>
              </div>
              <h4 style={{ textAlign: "center" }}>Total Employee</h4>
            </Card>
          </Col>
          <Col sm={24} lg={12} xs={24} xl={12}>
            <Card
              style={{
                width: "100%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img src={User} style={{ width: "130px" }} />
                <Card
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#5471ff",
                  }}
                >
                  <Typography
                    style={{
                      // marginBottom: "5rem",
                      textAlign: "center",
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {dataOfUser.length}
                  </Typography>
                </Card>
              </div>
              <h4 style={{ textAlign: "center" }}>Total Users</h4>
            </Card>
          </Col>
        </Row>

        {/* Second Row of Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              style={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Column {...configDesignation} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              style={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Funnel {...configCourse} />
            </Card>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};
export default Dashbord;
