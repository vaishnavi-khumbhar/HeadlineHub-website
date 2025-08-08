import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <h5 className="fw-bold">Headline Hub</h5>
        <p className="mb-1">Stay Ahead, Stay Informed</p>
        <small>&copy; {new Date().getFullYear()} Headline Hub. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
