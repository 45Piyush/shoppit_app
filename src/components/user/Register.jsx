import { useState } from "react";
import api from "../../api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare the data payload
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword : formData.confirmPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      state: formData.state,
      address: formData.address,
      phone: formData.phone,
    };

    // Send a POST request to the register/ endpoint using the configured API instance
    api
      .post("core/register/", payload)
      .then((res) => {
        if (res.status === 201) {
          alert("Registration successful! You can now log in.");
          // Optionally redirect the user to the login page
          window.location.href = "/login";
        } else {
          alert("Unexpected response. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        console.error("Error during registration:", error.response?.data);
        alert(
          error.response?.data?.detail ||
            "An error occurred. Please check your input and try again."
        );
      });
  }

  return (
    <div className="container my-4 col-md-5">
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <h4 className="mb-4 text-center">Register</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" >
          Register
        </button>
        <div className="login-footer">
          <p>
            <a href="#">Forgot Password?</a>
          </p>
          <p>
            Don`t have an Account? <a href="#">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
