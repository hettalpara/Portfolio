import React from 'react'

// ErrorMessage component - shows an error card when API fails
// Props: message (error text), onRetry (function to retry the API call)
// This is a reusable component that can be used anywhere in the app
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Something Went Wrong</h3>
      <p className="error-text">{message}</p>
      {/* Retry button - calls the onRetry function passed as prop */}
      <button className="retry-btn" onClick={onRetry}>
        🔄 Try Again
      </button>
    </div>
  )
}

export default ErrorMessage
