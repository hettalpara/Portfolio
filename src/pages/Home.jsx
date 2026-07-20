import React from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'

// Home page - combines Practical 1 components (Header, About, Skills)
function Home({ name, skillList }) {
  return (
    <div>
      {/* Header with name prop (Practical 1) */}
      <Header name={name} />

      {/* About section (Practical 1) */}
      <About />

      {/* Skills with skillList prop (Practical 1) */}
      <Skills skillList={skillList} />
    </div>
  )
}

export default Home
