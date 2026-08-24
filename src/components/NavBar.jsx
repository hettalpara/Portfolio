// NavBar.jsx - Navigation Bar Component
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  // Handle smooth scroll for section links (About, Skills)
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState({}, '', `/#${sectionId}`)
      }
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  // Handle Home link click to scroll to top if already on Home
  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState({}, '', '/')
    }
  }

  const currentPath = location.pathname
  const currentHash = location.hash

  const isHomeActive = currentPath === '/' && (!currentHash || currentHash === '#')
  const isAboutActive = currentPath === '/' && currentHash === '#about'
  const isSkillsActive = currentPath === '/' && currentHash === '#skills'

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" onClick={handleHomeClick} className="nav-logo">
          <span className="logo-text">Het Talpara</span>
        </Link>

        {/* Navigation links list */}
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              onClick={handleHomeClick}
              className={isHomeActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="/#about"
              onClick={(e) => handleSectionClick(e, 'about')}
              className={isAboutActive ? 'nav-link active' : 'nav-link'}
            >
              About
            </a>
          </li>
          <li>
            <Link
              to="/projects"
              className={currentPath === '/projects' ? 'nav-link active' : 'nav-link'}
            >
              Projects
            </Link>
          </li>
          <li>
            <a
              href="/#skills"
              onClick={(e) => handleSectionClick(e, 'skills')}
              className={isSkillsActive ? 'nav-link active' : 'nav-link'}
            >
              Skills
            </a>
          </li>
          <li>
            <Link
              to="/tasks"
              className={currentPath === '/tasks' ? 'nav-link active' : 'nav-link'}
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={currentPath === '/contact' ? 'nav-link active' : 'nav-link'}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
