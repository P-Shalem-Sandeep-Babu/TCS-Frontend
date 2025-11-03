import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css"; // Create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <h3>Contact Hyderabad Police - Main Branches</h3>

      <div className="footer-content">
        <div className="location">
          <h4>Hyderabad Police Headquarters</h4>
          <p>
            <FaMapMarkerAlt /> Basheerbagh, Hyderabad, Telangana - 500063
          </p>
          <p>
            <FaPhone /> 100 / 040-27852434
          </p>
        </div>

        <div className="location">
          <h4>Cyberabad Police Commissionerate</h4>
          <p>
            <FaMapMarkerAlt /> Gachibowli, Hyderabad, Telangana - 500032
          </p>
          <p>
            <FaPhone /> 100 / 040-27853034
          </p>
        </div>

        <div className="location">
          <h4>Rachakonda Police Commissionerate</h4>
          <p>
            <FaMapMarkerAlt /> Neredmet, Hyderabad, Telangana - 500056
          </p>
          <p>
            <FaPhone /> 100 / 040-27854034
          </p>
        </div>
      </div>

      <div className="social-icons">
        <FaInstagram /> <FaLinkedin /> <FaFacebook /> <FaWhatsapp />
      </div>

      <p>© 2025 Traffic Challan Management System. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
