import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Alert from "./Alert"; // Import our new Alert component
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState(null); // For our custom alert
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: "" });
  const navigate = useNavigate();

  // --- NEW: Password Strength Checker ---
  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = "";
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2) feedback = "Weak";
    else if (score < 4) feedback = "Fair";
    else feedback = "Strong";

    setPasswordStrength({ score, feedback });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setAlert({ type: "success", message: "Registration Successful! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      // --- NEW: Display specific backend error message ---
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      setAlert({ type: "danger", message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        {/* --- NEW: Custom Alert Component --- */}
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="e.g., John Doe" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="e.g., john@example.com" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Min. 6 characters"
                required
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* --- NEW: Password Strength Indicator --- */}
            {formData.password && (
              <div className="mt-2 d-flex align-items-center">
                <div className="progress flex-grow-1" style={{ height: "5px" }}>
                  <div
                    className={`progress-bar ${passwordStrength.score < 2 ? 'bg-danger' : passwordStrength.score < 4 ? 'bg-warning' : 'bg-success'}`}
                    role="progressbar"
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ms-2 small text-muted">{passwordStrength.feedback}</span>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;