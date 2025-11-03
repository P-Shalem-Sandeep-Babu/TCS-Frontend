import { useState } from "react";
import axios from "axios";
import { FaSearch, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PayChallan = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [challan, setChallan] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState(null);

  const handleSearch = async () => {
    setPaymentMessage(null);
    try {
      // --- UPDATED: Using Environment Variable ---
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/challans/search/${vehicleNumber}`);
      setChallan(data);
    } catch (error) {
      alert("Challan Not Found!");
      setChallan(null);
    }
  };

  const handlePayment = async () => {
    try {
      // --- UPDATED: Using Environment Variable ---
      await axios.put(`${process.env.REACT_APP_API_URL}/api/challans/pay/${challan._id}`);
      setPaymentMessage({ type: "success", text: "Payment Successful!" });
      setChallan({ ...challan, status: "Paid" });
    } catch (error) {
      setPaymentMessage({ type: "danger", text: "Payment Failed!" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Pay Challan</h2>

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

        {paymentMessage && <div className={`alert alert-${paymentMessage.type}`}>{paymentMessage.text}</div>}

        {challan && (
          <div className="mt-3">
            <h4>Challan Details</h4>
            <p><strong>Vehicle Number:</strong> {challan.vehicleNumber}</p>
            <p><strong>Owner Name:</strong> {challan.ownerName}</p>
            <p><strong>Fine Amount:</strong> ₹{challan.fineAmount}</p>
            <p>
              <strong>Status:</strong>
              {challan.status === "Paid" ? (
                <span className="text-success"> <FaCheckCircle /> Paid</span>
              ) : (
                <span className="text-danger"> <FaTimesCircle /> Unpaid</span>
              )}
            </p>

            {challan.status !== "Paid" && (
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
