// App.jsx - This is the ROOT COMPONENT of our React application
// It contains the layout structure (NavBar, Pages, Footer) and routing logic

// Importing React library (required in every React component)
import React from 'react'

// Importing Routes and Route from react-router-dom for page navigation
// Routes = container for all routes, Route = defines a single page route
import { Routes, Route } from 'react-router-dom'

// Importing reusable components that appear on every page
import NavBar from './components/NavBar'   // Navigation bar at the top
import Footer from './components/Footer'   // Footer at the bottom

// Importing page components (each represents a separate page/route)
import Home from './pages/Home'         // Home page (/ route)
import Projects from './pages/Projects' // Projects page (/projects route)
import Contact from './pages/Contact'   // Contact page (/contact route)

// Importing the main CSS file for styling the entire app
import './App.css'

// App component - the main component that wraps everything
function App() {
  // Variable to store the student name (passed as prop to child components)
  const name = "Het Talpara"

  // Array of skills (passed as prop to Skills component on the Home page)
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
      {/* NavBar is displayed on every page (outside Routes) */}
      <NavBar />

      {/* Main content area - changes based on the current route/URL */}
      <main className="main-content">
        {/* Routes component defines all the pages in our app */}
        <Routes>
          {/* Route for Home page - displays when URL is "/" */}
          {/* Passing name and skillList as props to Home component */}
          <Route path="/" element={<Home name={name} skillList={skillList} />} />

          {/* Route for Projects page - displays when URL is "/projects" */}
          {/* This page fetches GitHub repos using API (Practical 3) */}
          <Route path="/projects" element={<Projects />} />

          {/* Route for Contact page - displays when URL is "/contact" */}
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
