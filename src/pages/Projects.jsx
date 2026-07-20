import React from 'react'

// Projects page (Practical 2)
function Projects() {
  // Simple project data
  const projectList = [
  {
    title: "IntellMeet",
    description:
      "An AI-powered enterprise meeting and collaboration platform with real-time video meetings, workspace management, task board, and AI meeting summaries.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "WebRTC"]
  },
  {
    title: "Student Management System",
    description:
      "A web application to manage student records, including adding, updating, deleting, and searching student information.",
    tech: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "Online Food Ordering System",
    description:
      "A responsive food ordering website where users can browse the menu, add items to the cart, and place orders.",
    tech: ["React", "CSS", "JavaScript"]
  }
];

  return (
    <section className="projects-page">
      <div className="section-container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Here are some of the projects I've worked on.</p>

        <div className="projects-grid">
          {/* Using map() to display project cards */}
          {projectList.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-number">0{index + 1}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((item, i) => (
                  <span key={i} className="tech-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
