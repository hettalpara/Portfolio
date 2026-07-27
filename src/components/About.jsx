// About.jsx - About Me Section Component (Practical 1)
// This component displays personal information and quick info cards
// It does not receive any props - all data is hardcoded inside

import React from 'react'

// About component - displays the "About Me" section on the Home page
function About() {
  return (
    // id="about" allows the hero button to scroll to this section
    <section className="about" id="about">
      <div className="section-container">
        {/* Section heading */}
        <h2 className="section-title">About Me</h2>

        <div className="about-content">
          {/* Left side - text description about the student */}
          <div className="about-text">
            <p>
              I am a <strong>B.Tech Computer Science</strong> student currently in my
              5th semester. I enjoy learning new technologies and building web applications.
              My goal is to become a skilled full-stack developer.
            </p>
            <p>
              I have experience with front-end technologies like HTML, CSS, and JavaScript.
              I am currently learning <strong>React.js</strong> to build modern and
              interactive user interfaces.
            </p>
          </div>

          {/* Right side - quick info cards showing education, location, and focus */}
          <div className="about-cards">
            {/* Education card */}
            <div className="info-card">
              <span className="info-icon">🎓</span>
              <h3>Education</h3>
              <p>B.Tech CSE - 5th Sem</p>
            </div>
            {/* Location card */}
            <div className="info-card">
              <span className="info-icon">📍</span>
              <h3>Location</h3>
              <p>Gujarat, India</p>
            </div>
            {/* Focus area card */}
            <div className="info-card">
              <span className="info-icon">💻</span>
              <h3>Focus</h3>
              <p>Web Development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Exporting About so it can be used in Home.jsx
export default About
