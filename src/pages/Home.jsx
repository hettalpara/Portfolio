import React from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'

function Home({ name, skillList }) {
  return (
    <div>

      <Header name={name} />


      <About />


      <Skills skillList={skillList} />
    </div>
  )
}

export default Home
