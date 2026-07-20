import React from 'react'

function About() {
  return (
    <section className="about" id="about">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          {}
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

          {/* Right side - quick info cards */}
          <div className="about-cards">
            <div className="info-card">
              <span className="info-icon">🎓</span>
              <h3>Education</h3>
              <p>B.Tech CSE - 5th Sem</p>
            </div>
            <div className="info-card">
              <span className="info-icon">📍</span>
              <h3>Location</h3>
              <p>Gujarat, India</p>
            </div>
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

export default About
