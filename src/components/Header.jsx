// Header.jsx - Hero/Header Section Component (Practical 1)
// This component displays the hero banner at the top of the Home page
// It receives the "name" prop from the parent component (Home -> App)

import React from 'react'

// Header component - displays the welcome banner with name and CTA buttons
// Props: name (string) - the student's name to display in the hero section
function Header({ name }) {
  return (
    // <section> is a semantic HTML tag for a distinct section of content
    <section className="hero">
      <div className="hero-container">
        {/* Badge - a small label above the main title */}
        <span className="hero-badge">👋 Welcome to my portfolio</span>

        {/* Main heading - uses the "name" prop received from parent */}
        {/* JSX uses curly braces {} to insert JavaScript variables */}
        <h1 className="hero-title">
          Hi, I'm <span className="hero-highlight">{name}</span>
        </h1>

        {/* Subtitle - brief description about the student */}
        <p className="hero-subtitle">
          A passionate Computer Science student who loves building web applications
          and learning new technologies.
        </p>

        {/* Call-to-action buttons - navigate to sections on the page */}
        <div className="hero-buttons">
          <a href="#about" className="btn btn-primary">About Me</a>
          <a href="#skills" className="btn btn-outline">My Skills</a>
        </div>
      </div>
    </section>
  )
}

// Exporting Header so it can be used in Home.jsx
export default Header
