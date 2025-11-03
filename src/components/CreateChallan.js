import { useState } from "react";
import axios from "axios";
import {
  FaCar,
  FaUser,
  FaMoneyBillWave,
  FaFileInvoice,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const CreateChallan = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    ownerName: "",
    fineAmount: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateChallan = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (
      !formData.vehicleNumber ||
      !formData.ownerName ||
      !formData.fineAmount
    ) {
      setMessage({
        type: "danger",
        text: "Please fill all fields correctly!",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/challans/create", formData);
      setMessage({
        type: "success",
        text: "Challan Created Successfully!",
      });
      setFormData({
        vehicleNumber: "",
        ownerName: "",
        fineAmount: "",
      }); // Clear form after submission
    } catch (error) {
      setMessage({
        type: "danger",
        text:
          "Failed to Create Challan: " +
          (error.response?.data?.message || error.message),
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Issue a Traffic Challan</h2>

        {/* Display Success/Error Message */}
        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleCreateChallan}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaCar />
            </span>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Vehicle Number"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Owner Name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaMoneyBillWave />
            </span>
            <input
              type="number"
              name="fineAmount"
              value={formData.fineAmount}
              onChange={handleChange}
              placeholder="Fine Amount (₹)"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            <FaFileInvoice className="me-2" /> Issue Challan
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallan;
