import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // Use the login function from AuthContext
      login(data.token, data.role);
      
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login Failed. Please try again.");
      setFormData({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">User Login</h2>

        {/* Image */}
        <div className="text-center">
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/63/48/biker-riding-motorcycle-isolated-flat-vector-46026348.jpg"
            alt="Biker"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>

        {/* Error Message */}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

        <form onSubmit={handleLogin} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login as User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;