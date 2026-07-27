// main.jsx - This is the ENTRY POINT of our React application
// React starts executing from this file

// Importing React's StrictMode for highlighting potential problems during development
import { StrictMode } from 'react'

// createRoot is used to create the root of our React app (React 18+ method)
import { createRoot } from 'react-dom/client'

// BrowserRouter enables client-side routing using React Router
// It wraps the entire app so that all pages can use routing features
import { BrowserRouter } from 'react-router-dom'

// Importing global CSS styles (reset, variables, base styles)
import './index.css'

// Importing the main App component which contains all pages and layout
import App from './App.jsx'

// document.getElementById('root') finds the <div id="root"> in index.html
// createRoot() attaches our React app to that div
// .render() tells React what to display on the screen
createRoot(document.getElementById('root')).render(
  // StrictMode helps catch common bugs during development (no effect in production)
  <StrictMode>
    {/* BrowserRouter wraps the app to enable page navigation without page reload */}
    <BrowserRouter>
      {/* App is the main component that holds our entire portfolio */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
