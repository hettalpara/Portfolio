// Footer.jsx - Footer Component (Practical 1)
// This component displays the footer at the bottom of every page
// It contains brand info, contact details, and copyright text
// It is rendered outside of Routes in App.jsx, so it appears on all pages

import React from 'react'

// Footer component - displays the site footer with contact info
function Footer() {
  return (
    // <footer> is a semantic HTML tag for the page footer
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left side - brand name and short description */}
          <div className="footer-brand">
            <span className="footer-logo">Het Talpara</span>
            <p className="footer-desc">
              A Computer Science student passionate about web development.
            </p>
          </div>

          {/* Right side - contact information with email and GitHub link */}
          <div className="footer-contact">
            <h4>Contact</h4>
            {/* Email link - opens the user's email client when clicked */}
            <p>
              📧{" "} <a href="mailto:hettalpara@gmail.com">hettalpara@gmail.com</a>
            </p>

            {/* GitHub link - opens in a new tab */}
            {/* target="_blank" opens link in new tab */}
            {/* rel="noopener noreferrer" is for security when using target="_blank" */}
            <p>
              🔗{" "} <a href="https://github.com/hettalpara" target="_blank" rel="noopener noreferrer">github.com/hettalpara</a>
            </p>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="footer-bottom">
          {/* &copy; renders the © symbol in HTML */}
          <p>&copy; 2025 Het Talpara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Exporting Footer so it can be used in App.jsx
export default Footer
