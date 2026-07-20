import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
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
      {}
      <NavBar />

      {}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home name={name} skillList={skillList} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {}
      <Footer />
    </div>
  )
}

export default App
