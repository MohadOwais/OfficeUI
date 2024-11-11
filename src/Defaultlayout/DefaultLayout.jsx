import React, { useState, useEffect } from "react";
// import navImage from "../../assets/Images/aqib-logo-.png";
import {
  AppstoreOutlined,
  BarChartOutlined,
  // CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import {
  Row,
  Col,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  theme,
  Button,
  Typography,
} from "antd";
// import { AllRoutes } from "../../routes";
import { useLocation, useNavigate } from "react-router-dom";
import MyLogo from "../photos/Mylogo.jpg";
const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dataOfUser, setDataOfUser] = useState([]);
  const [selectedKey, setSelectedKey] = useState("dashboard"); // Track the selected key
  const navigate = useNavigate();
  const location = useLocation();
  const Names = localStorage.getItem("userName");
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchUsersData();
  }, []);

  // const fetchUsersData = () => {
  //   axios
  //     .get("http://localhost:8081/user/get-user")
  //     .then((response) => {
  //       setDataOfUser(response.data.user);
  //       const result = dataOfUser.sort((a, b) => {
  //         return a.localeCompare(b);
  //       });
  //       console.log("result", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //     });
  // };
  const fetchUsersData = () => {
    axios
      .get("http://localhost:8081/user/get-user")
      .then((response) => {
        // setDataOfUser(response.data.user);

        // Sort the data based on the 'name' field
        const result = response.data.user.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        // Optionally, update your state with the sorted data
        setDataOfUser(result);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    const filteredData = dataOfUser.filter((item) => item._id === userId);

    if (filteredData.length > 0) {
      console.log(filteredData[0].userType);
      setIsAdmin(filteredData[0].userType === "admin");
    } else {
      console.log("No matching data found");
    }
  }, [dataOfUser, userId]);

  const AllRoutes = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: <BarChartOutlined style={{ fontSize: "20px" }} />,
    },
    {
      key: "Employee",
      label: "Employees",
      path: "/employee",
      icon: <UserOutlined style={{ fontSize: "20px" }} />,
    },
    isAdmin && {
      key: "userManagement",
      label: "Users",
      path: "/user-manager",
      icon: <UserAddOutlined style={{ fontSize: "20px" }} />,
    },
  ];

  // Handle navigation on menu item click
  const handleNavigate = ({ key }) => {
    const route = AllRoutes.find((route) => route.key === key);
    if (route && route.path) {
      navigate(route.path);
      setSelectedKey(key); // Update selected key when navigating
    }
  };

  // Update selectedKey based on the current route
  useEffect(() => {
    const currentRoute = AllRoutes.find(
      (route) => route.path === location.pathname
    );
    if (currentRoute) {
      setSelectedKey(currentRoute.key); // Set the selected key based on the current path
    }
  }, [location, AllRoutes]);
  const handleLogin = () => {
    localStorage.removeItem("userName"); // Remove specific item
    localStorage.removeItem("id"); // Remove specific item
    navigate("/"); // Navigate to the home page
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "white",
            itemSelectedColor: "black",
          },
          Table: {
            headerBg: "#feccdc",
            headerSplitColor: "#feccdc",
            headerSortActiveBg: "#467ecf",
            colorTextHeading: "black",
          },
          Popover: {
            titleMinWidth: "0px",
            borderRadiusLG: "1px",
          },
        },
      }}
    >
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
            backgroundColor: "white",
            padding: 0, // Remove default padding
          }}
          className="Box"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "auto",
              padding: "0 10px",
            }}
          >
            <img
              src={MyLogo}
              alt="MyLogo"
              style={{
                width: "60px",
                marginLeft: "5rem",
                maxWidth: "100%",
                maxHeight: "85px",
                marginTop: "0",
              }}
            />

            <Menu
              theme="light"
              mode="horizontal"
              style={{
                width: "100%",
                fontWeight: "bold",
                fontFamily: "Poppins",
                display: "flex",
                justifyContent: "center",
              }}
            />

            {/* Container for Names and Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography
                style={{
                  fontSize: "18x",
                  // fontWeight: "bold",
                  whiteSpace: "nowrap", // Prevent text from wrapping to the next line
                }}
              >
                Welcome {Names}
              </Typography>

              <Button
                style={{
                  backgroundColor: "#feccdc",
                  color: "black",
                  width: "10rem",
                  height: "3rem",
                  fontSize: "20px",
                  borderRadius: "10px",
                }}
                onClick={handleLogin}
              >
                Log out
              </Button>
            </div>
          </div>
        </Header>
      </Layout>
      <Layout>
        <Layout style={{ display: "flex" }}>
          <Sider
            style={{
              height: "900px",
              overflow: "hidden",
              backgroundColor: "white",
              marginTop: "1%",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              marginLeft: !collapsed ? "0.5%" : "0",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
              padding: "0",
              boxSizing: "border-box",
              backgroundColor: "pink",
              marginRight: "1rem", // Add this line to create space between sidebar and content
            }}
          >
            <img
              src={MyLogo}
              style={{
                width: "60px",
                paddingTop: "1rem",
                justifyContent: "center",
                display: "block",
                margin: "0 auto",
              }}
            />
            <hr />
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              style={{
                // height: "calc(100vh - 80px)",
                height: "calc(500px - 80px)",
                // height: "calc(00px - 80px)",
                borderRight: 0,
                overflowY: "auto",
                padding: "0.5rem",
                fontSize: "16px",
                backgroundColor: "pink",
              }}
              items={AllRoutes.map((route) => ({
                key: route.key,
                label: route.label,
                icon: route.icon,
                onClick: handleNavigate,
              }))}
            />
          </Sider>
          <Layout style={{ flex: 1 }}>
            <Content
              style={{
                marginTop: "1rem",
                marginRight: "0.5rem",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default DefaultLayout;
