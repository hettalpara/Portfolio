// Skills.jsx - Skills Section Component (Practical 1)
// This component displays a grid of skills using the map() method
// It receives "skillList" array as a prop from the parent (Home -> App)

import React from 'react'

// Skills component - renders skill cards in a grid layout
// Props: skillList (array of strings) - list of skills to display
function Skills({ skillList }) {
  // Object that maps each skill name to an emoji icon
  // This is used to display an icon next to each skill name
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
    // id="skills" allows the hero button to scroll to this section
    <section className="skills" id="skills">
      <div className="section-container">
        {/* Section heading */}
        <h2 className="section-title">My Skills</h2>

        {/* Skills grid - displays skill cards in a responsive grid */}
        <div className="skills-grid">
          {/* Using map() to loop through skillList array and create a card for each skill */}
          {/* map() takes each item in the array and returns JSX for it */}
          {/* key={index} is required by React to identify each element in the list */}
          {skillList.map((skill, index) => (
            <div key={index} className="skill-card">
              {/* Display the icon for this skill, or a default icon if not found */}
              <span className="skill-icon">{skillIcons[skill] || "💡"}</span>
              {/* Display the skill name */}
              <span className="skill-name">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Exporting Skills so it can be used in Home.jsx
export default Skills
