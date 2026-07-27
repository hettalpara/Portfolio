import React from 'react'

// Spinner component - shows a loading animation
// This is a reusable component that can be used anywhere in the app
function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">Loading repositories...</p>
    </div>
  )
}

export default Spinner
