import "./login.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true); 
   setError(""); 
   try {
     const result = await axios.post("http://localhost:7000/api/login", {
       username,
       password,
     });

     const userId = result.data.data.user._id; 

     navigate(`/dashbord/${userId}`);
   } catch (err) {
     setError("Login failed. username or password incorrect"); 
     console.log(err);
   } finally {
     setLoading(false); 
   }
 };


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <input
          style={{ cursor: "pointer" }}
          type="submit"
          value={loading ? "Logging in..." : "Login"}
          disabled={loading} 
        />
        <Link to="/register">If you are not registered, click here</Link>
        {error && <p className="error">{error}</p>} 
      </form>
    </div>
  );
};

export default Login;
