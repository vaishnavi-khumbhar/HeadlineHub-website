import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const navLinks = [
  { name: "Home", path: "/" },
  { name: "Business", path: "/business" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "General", path: "/general" },
  { name: "Health", path: "/health" },
  { name: "Science", path: "/science" },
  { name: "Sports", path: "/sports" },
  { name: "Technology", path: "/technology" },
];

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-gradient-primary shadow-sm">
      <div className="container-fluid">
        {/*  Brand */}
        <Link className="navbar-brand fw-bold fs-3 text-light" to="/">
          <span className="text-warning">Headline</span>Hub
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  className={`nav-link px-3 ${
                    location.pathname === link.path ? "active fw-bold text-warning" : ""
                  }`}
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*CSS for Gradient */}
      <style>{`
        .bg-gradient-primary {
          background: linear-gradient(90deg, #0d1b2a, #1b263b, #415a77);
        }
        .navbar .nav-link:hover {
          color: #ffd700 !important;
          transition: 0.3s;
        }
        .navbar .active {
          border-bottom: 2px solid #ffd700;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
