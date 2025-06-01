import React from "react";
import { useState, useEffect } from "react";
import './styles/navbar.css';

const Navbar = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch authenticated user data
    fetch("http://localhost:3000/api/auth/user", { 
      method: "GET",
      credentials: "include" 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          console.log("User fetched : ", data);
          setUser(data.user || null);
        }
      })
      .catch(() => setUser(null)); // If not authenticated, set user to null
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { credentials: "include" , method: "POST"})
      .then(() => {
        setUser(null);
        window.location.reload(); // Refresh to apply changes
      })
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
      <div className="container-fluid">
        <a className="navbar-brand text-primary fw-bold ms-3" href="/">
          LocateMate
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link text-white-50" href="/post-lost">Post Lost Item</a></li>
            <li class="nav-item"><a class="nav-link text-white-50 me-2" href="/browse-lost-items">Browse Lost Items</a></li>
            {user ? (
              // Profile Dropdown when logged in
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* {user.username} */}
                  <img src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" alt="" className="profile-img" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="/dashboard">My Dashboard</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              // Login & Register buttons when not logged in
              <li className="nav-item d-flex">
                <a className="btn btn-outline-primary me-2" href="/register">
                  Register
                </a>
                <a className="btn btn-outline-primary" href="/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
