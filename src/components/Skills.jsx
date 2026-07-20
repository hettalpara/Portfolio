import React from 'react'

function Skills({ skillList }) {
  const skillIcons = {
    "HTML": "🌐",
    "CSS": "🎨",
    "JavaScript": "⚡",
    "React.js": "⚛️",
    "Node.js": "🟢",
    "Git & GitHub": "📂",
    "Python": "🐍",
    "MySQL": "🗄️"
  }

  return (
    <section className="skills" id="skills">
      <div className="section-container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {/* Using map() to display each skill from the array (Practical 1 requirement) */}
          {skillList.map((skill, index) => (
            <div key={index} className="skill-card">
              <span className="skill-icon">{skillIcons[skill] || "💡"}</span>
              <span className="skill-name">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
