import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaSearch, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Logged Out Successfully!");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Dashboard</h2>
        <p className="text-center">Welcome to the Traffic Challan Management System</p>

        <div className="list-group">
          <Link to="/create-challan" className="list-group-item list-group-item-action">
            <FaPlusCircle className="me-2" /> Create Challan
          </Link>
          <Link to="/search-challan" className="list-group-item list-group-item-action">
            <FaSearch className="me-2" /> Search Challan
          </Link>
          <Link to="/pay-challan" className="list-group-item list-group-item-action">
            <FaCreditCard className="me-2" /> Pay Challan
          </Link>
        </div>

        <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;