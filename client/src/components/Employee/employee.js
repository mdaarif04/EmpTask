import "./emp.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState(""); // State for designation
  const [gender, setGender] = useState("M");
  const [courses, setCourses] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const[username, setUsername] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Create FormData to send the file and other data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation); // Send designation
    formData.append("gender", gender);
    formData.append("courses", JSON.stringify(courses));
    formData.append("avatar", avatar);

    try {
      const result = await axios.post(
        "http://localhost:7000/api/employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Employee created successfully!");

      // Clear the form fields
      setName("");
      setEmail("");
      setMobile("");
      setDesignation(""); // Reset designation
      setGender("M");
      setCourses([]);
      setAvatar(null);

      console.log(result.data);
      navigate("/dashbord/:id"); // Change this to your desired route
    } catch (err) {
      // Check if the error response has a message
      if (err.response && err.response.data.error) {
        setError(err.response.data.error); // Set the error message from the server
      } else {
        setError("Employee creation failed. Please try again.");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="logo">{/* <h2>Logo</h2> */}</div>
        <nav className="nav-menu">
          <Link to="/dashbord">Home</Link>
          <Link to="/emplist">Employee List</Link>
          <Link to="/employee">Create Employe</Link>
          <span>{username || "Guest"}</span>
          <span style={{ cursor: "pointer" }} onClick={logoutHandler}>
            Logout
          </span>
        </nav>
      </header>
      <div className="create-employee-container">
        <h1>Create Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label>Mobile No</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
              {/* Add more designations as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Courses</label>
            <div>
              <input
                type="checkbox"
                value="MCA"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCourses((prev) => [...prev, e.target.value]);
                  } else {
                    setCourses((prev) =>
                      prev.filter((course) => course !== e.target.value)
                    );
                  }
                }}
              />{" "}
              MCA
              <input
                type="checkbox"
                value="BCA"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCourses((prev) => [...prev, e.target.value]);
                  } else {
                    setCourses((prev) =>
                      prev.filter((course) => course !== e.target.value)
                    );
                  }
                }}
              />{" "}
              BCA
              <input
                type="checkbox"
                value="BSC"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCourses((prev) => [...prev, e.target.value]);
                  } else {
                    setCourses((prev) =>
                      prev.filter((course) => course !== e.target.value)
                    );
                  }
                }}
              />{" "}
              BSC
            </div>
          </div>
          <div className="form-group">
            <label>Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
          </div>

          {/* Display error message */}
          {error && <p className="error">{error}</p>}

          {/* Display success message */}
          {success && <p className="success">{success}</p>}

          {/* Submit button */}
          <input
            style={{ cursor: "pointer" }}
            type="submit"
            value={loading ? "Creating..." : "Create Employee"}
            disabled={loading} // Disable the button while loading
          />
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;
