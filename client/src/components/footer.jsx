import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; 2024 LocateMate. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-white-50 text-decoration-none me-3">Privacy Policy</a>
          <a href="#" className="text-white-50 text-decoration-none me-3">Terms & Conditions</a>
          <a href="#" className="text-white-50 text-decoration-none">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
