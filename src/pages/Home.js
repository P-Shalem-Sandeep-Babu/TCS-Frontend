import React from "react";
import "./Home.css"; // Make sure Home.css is in the same folder

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header>
        <h1>Welcome to Traffic Challan Management System</h1>
        <p>Efficiently manage traffic fines for a better and safer city.</p>
      </header>

      {/* Traffic Image */}
      <img
        src="https://www.prabhatkhabar.com/wp-content/uploads/2024/08/Traffic-Challan-Rules-1.jpg"
        alt="Traffic Police Challan"
        className="traffic-image"
      />
    </div>
  );
};

export default Home;
