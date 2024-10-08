import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        console.error("User ID is undefined");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:7000/api/users/${id}`
        );
        const userData = response.data;

        if (userData && userData.username) {
          setUsername(userData.username);
        } else {
          setUsername("Guest");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [id]);

  const logoutHandler = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="dashboard-header">
      <nav className="nav-menu">
        <Link to={`/dashbord/${id}`}>Home</Link>
        <Link to="/emplist">Employee List</Link>
        <Link to="/employee">Create Employee</Link>
        <span>{username || "Guest"}</span>
        <span style={{ cursor: "pointer" }} onClick={logoutHandler}>
          Logout
        </span>
      </nav>
    </header>
  );
};

export default Header;
