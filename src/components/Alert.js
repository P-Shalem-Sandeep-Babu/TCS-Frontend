import React, { useEffect } from 'react';
import './Alert.css'; // We will create this CSS file

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    // Auto-close the alert after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type} alert-dismissible`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Alert;