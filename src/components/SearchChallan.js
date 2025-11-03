import { useState } from "react";
import axios from "axios";
import { FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SearchChallan = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [challan, setChallan] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setChallan(null);
    setError(null);

    try {
      // --- UPDATED: Using Environment Variable ---
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/challans/search/${vehicleNumber}`);
      setChallan(data);
    } catch (error) {
      setError("No Challan Found for this Vehicle Number!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Search Challan</h2>

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

        {error && <div className="alert alert-danger">{error}</div>}

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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchChallan;
