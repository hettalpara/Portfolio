import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// NavBar component with Link for navigation without page reload (Practical 2)
function NavBar() {
  // Get current page path to highlight active link
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand / Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-text">Het Talpara</span>
        </Link>

        {/* Navigation Links using Link instead of <a> tags */}
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className={location.pathname === "/projects" ? "nav-link active" : "nav-link"}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "nav-link active" : "nav-link"}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
