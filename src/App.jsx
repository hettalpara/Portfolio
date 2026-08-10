import React from 'react'

import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Tasks from './pages/Tasks'

import './App.css'

function App() {
  const name = "Het Talpara"

  const skillList = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Node.js",
    "Git & GitHub",
    "Python",
    "MySQL"
  ]

  return (
    <div className="app">
      <NavBar />

      <main className="main-content">
        {/* Routes component defines all the pages in our app */}
        <Routes>
          <Route path="/" element={<Home name={name} skillList={skillList} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer is displayed on every page (outside Routes) */}
      <Footer />
    </div>
  )
}

// Exporting App so it can be used in main.jsx
export default App
