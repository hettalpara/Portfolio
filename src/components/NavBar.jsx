// NavBar.jsx - Navigation Bar Component
// This component displays the top navigation bar with links to all pages
// It uses React Router's Link component for client-side navigation (no page reload)

import React from 'react'

// Link = replacement for <a> tag, navigates without refreshing the page
// useLocation = hook that tells us the current URL/path (used to highlight active link)
import { Link, useLocation } from 'react-router-dom'

// NavBar component - renders the navigation bar at the top of every page
function NavBar() {
  // useLocation() returns the current URL location object
  // location.pathname gives us the current path like "/", "/projects", "/contact"
  const location = useLocation()

  return (
    // <nav> is a semantic HTML tag for navigation sections
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand - clicking it goes to the home page */}
        <Link to="/" className="nav-logo">
          <span className="logo-text">Het Talpara</span>
        </Link>

        {/* Navigation links list */}
        <ul className="nav-links">
          {/* Home link - adds "active" class if current path is "/" */}
          <li>
            <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Home
            </Link>
          </li>
          {/* About link - scrolls to about section on home page */}
          <li>
            <Link to="/#about" className={location.pathname === "/#about" ? "nav-link active" : "nav-link"}>
              About
            </Link>
          </li>
          {/* Projects link - adds "active" class if current path is "/projects" */}
          <li>
            <Link to="/projects" className={location.pathname === "/projects" ? "nav-link active" : "nav-link"}>
              Projects
            </Link>
          </li>
          {/* Skills link - scrolls to skills section on home page */}
          <li>
            <Link to="/#skills" className={location.pathname === "/#skills" ? "nav-link active" : "nav-link"}>
              Skills
            </Link>
          </li>
          {/* Tasks link - navigates to the Tasks page (Practical 4) */}
          <li>
            <Link to="/tasks" className={location.pathname === "/tasks" ? "nav-link active" : "nav-link"}>
              Tasks
            </Link>
          </li>
          {/* Contact link - adds "active" class if current path is "/contact" */}
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

// Exporting NavBar so it can be imported in App.jsx
export default NavBar
