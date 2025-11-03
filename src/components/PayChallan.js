import { useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const PayChallan = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [challan, setChallan] = useState(null);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/challans/search/${vehicleNumber}`
      );
      setChallan(data);
    } catch (error) {
      alert("Challan Not Found!");
      setChallan(null);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.put(`http://localhost:5000/api/challans/pay/${challan._id}`);
      alert("Payment Successful!");
      setChallan({ ...challan, isPaid: true });
    } catch (error) {
      alert("Payment Failed!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Pay Challan</h2>

        {/* Search Input */}
        <div className="input-group mb-3">
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Enter Vehicle Number"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-info">
            <FaSearch /> Search
          </button>
        </div>

        {/* Display Challan Details */}
        {challan && (
          <div className="mt-3">
            <h4>Challan Details</h4>
            <p>
              <strong>Vehicle Number:</strong> {challan.vehicleNumber}
            </p>
            <p>
              <strong>Owner Name:</strong> {challan.ownerName}
            </p>
            <p>
              <strong>Fine Amount:</strong> ₹{challan.fineAmount}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {challan.isPaid ? (
                <span className="text-success">
                  <FaCheckCircle /> Paid
                </span>
              ) : (
                <span className="text-danger">
                  <FaTimesCircle /> Pending
                </span>
              )}
            </p>

            {/* Show Pay Button if Not Paid */}
            {!challan.isPaid && (
              <button onClick={handlePayment} className="btn btn-success mt-2">
                <FaMoneyBillWave /> Pay Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PayChallan;
