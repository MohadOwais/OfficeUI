import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./views/Dashbord/Dashbord";
import Dashboard from "../src/views/Dashbord/Dashbord";
import UserManager from "./views/Dashbord/UserMangemnet/UserManager";
import Employee from "./views/Dashbord/Employee/Employee";
import Login from "./views/Dashbord/Login/Login";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dataOfUser, setDataOfUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = () => {
    axios
      .get("http://localhost:8081/user/get-user")
      .then((response) => {
        setDataOfUser(response.data.user);
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

  const AllRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-manager" element={<UserManager />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    );
  };

  const UserRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    );
  };

  return <Router>{isAdmin ? <AllRoutes /> : <UserRoutes />}</Router>;
}

export default App;
