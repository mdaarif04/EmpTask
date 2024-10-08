import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 
    axios
      .post("http://localhost:7000/api/register", {
        username,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        setUsername("");
        setEmail("");
        setPassword("");

        navigate("/login");
      })
      .catch((err) => {
        setError("Registration failed. Please try again.");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <input
          style={{ cursor: "pointer" }}
          type="submit"
          value={loading ? "Registering..." : "Register"}
          disabled={loading} 
        />

        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
