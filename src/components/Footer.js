import React from 'react';
import '../App.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} 🍽️ Thalassery Nadan Restaurant +91 8891221153
        </p>
        <div className="footer-links">
          <a href="/menu">Menu</a>
          <a href="/reserve">Reservations</a>
          <a href="/contact">Home</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
