import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {}
          <div className="footer-brand">
            <span className="footer-logo">Het Talpara</span>
            <p className="footer-desc">
              A Computer Science student passionate about web development.
            </p>
          </div>

          {/* Right side - contact info */}
          <div className="footer-contact">
            <h4>Contact</h4>
           <p>
                  📧{" "} <a href="mailto:hettalpara@gmail.com">hettalpara@gmail.com</a>
           </p>

            <p>
                 🔗{" "} <a href="https://github.com/hettalpara" target="_blank" rel="noopener noreferrer">github.com/hettalpara</a>
</p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>&copy; 2025 Het Talpara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
