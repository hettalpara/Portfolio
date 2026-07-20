import React, { useState } from 'react'

function Contact() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  return (
    <section className="contact-page">
      <div className="section-container">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Feel free to reach out! Fill in the form below.</p>

        <div className="contact-form-card">
          <div className="form-group">
            <label htmlFor="nameInput">Your Name</label>
            <input
              id="nameInput"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="messageInput">Your Message</label>
            <textarea
              id="messageInput"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
            />
          </div>

          {name && (
            <p className="realtime-text">👋 Hello, <strong>{name}</strong>!</p>
          )}
          {message && (
            <p className="realtime-text">💬 {message}</p>
          )}

          <button className="submit-btn">Send Message</button>
        </div>
      </div>
    </section>
  )
}

export default Contact
