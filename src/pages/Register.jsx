import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await registerUser(form)
      setMessage('Registration successful. Redirecting to login...')
      setTimeout(() => navigate('/login'), 700)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-eyebrow">Task Manager</p>
        <h1>Create account</h1>
        <p className="auth-subtitle">Start organizing your work.</p>
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label>Password<input type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
        <button className="btn btn-primary auth-submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        <p className="auth-switch">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </main>
  )
}

export default Register
