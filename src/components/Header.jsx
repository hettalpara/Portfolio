import React from 'react'

// Header component - receives student name as prop (Practical 1 requirement)
function Header({ name }) {
  return (
    <section className="hero">
      <div className="hero-container">
        <span className="hero-badge">👋 Welcome to my portfolio</span>
        <h1 className="hero-title">
          Hi, I'm <span className="hero-highlight">{name}</span>
        </h1>
        <p className="hero-subtitle">
          A passionate Computer Science student who loves building web applications
          and learning new technologies.
        </p>
        <div className="hero-buttons">
          <a href="#about" className="btn btn-primary">About Me</a>
          <a href="#skills" className="btn btn-outline">My Skills</a>
        </div>
      </div>
    </section>
  )
}

export default Header
