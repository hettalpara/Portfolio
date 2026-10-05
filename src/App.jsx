import React, { lazy, Suspense, useEffect } from 'react'

import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

const Projects = lazy(() => import('./pages/Projects'))
const Tasks = lazy(() => import('./pages/Tasks'))

import './App.css'

function App() {
  const location = useLocation()
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

  // Automatically scroll to target section when URL contains a hash (e.g. /#skills or /#about)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <div className="app">
      <NavBar />

      <main className="main-content">
        {/* Routes component defines all the pages in our app */}
        <Suspense
          fallback={
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="spinner-text">Loading page...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home name={name} skillList={skillList} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer is displayed on every page (outside Routes) */}
      <Footer />
    </div>
  )
}

function ProtectedRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />
}

// Exporting App so it can be used in main.jsx
export default App
