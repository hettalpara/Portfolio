import React, { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

// Projects page - Practical 3: API Integration and Data Rendering
function Projects() {
  // --- State variables for API data ---
  const [repos, setRepos] = useState([])       // stores fetched repositories
  const [loading, setLoading] = useState(true)  // tracks loading state
  const [error, setError] = useState(null)       // stores error message

  // --- State variable for search feature (Bonus) ---
  const [searchTerm, setSearchTerm] = useState('')

  // --- GitHub API URL ---
  const API_URL = 'https://api.github.com/users/hettalpara/repos'

  // --- Function to fetch repositories from GitHub API ---
  const fetchRepos = () => {
    // Reset states before fetching
    setLoading(true)
    setError(null)

    // Using fetch() to call GitHub REST API
    fetch(API_URL)
      .then((response) => {
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch repositories. Please try again later.')
        }
        return response.json()
      })
      .then((data) => {
        // Sort repos by stars (highest first)
        const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(sortedRepos)   // store the data in state
        setLoading(false)       // stop loading
      })
      .catch((err) => {
        // If API fails, store error message
        setError(err.message)
        setLoading(false)
      })
  }

  // --- useEffect to fetch data when the page loads ---
  useEffect(() => {
    fetchRepos()
  }, []) // empty dependency array = runs only once on mount

  // --- Filter repos based on search term (Bonus) ---
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="projects-page">
      <div className="section-container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          My GitHub repositories fetched using the GitHub REST API.
        </p>

        {/* Search bar for filtering repositories (Bonus) */}
        {!loading && !error && (
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {/* Show result count */}
            {searchTerm && (
              <span className="search-count">
                {filteredRepos.length} found
              </span>
            )}
          </div>
        )}

        {/* --- Loading State: Show Spinner --- */}
        {loading && <Spinner />}

        {/* --- Error State: Show Error Message with Retry --- */}
        {error && <ErrorMessage message={error} onRetry={fetchRepos} />}

        {/* --- Success State: Display Repositories --- */}
        {!loading && !error && (
          <div className="projects-grid">
            {/* Using map() to render repository cards */}
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <div key={repo.id} className="project-card repo-card">
                  {/* Star count badge (Bonus) */}
                  <div className="star-badge">
                    ⭐ {repo.stargazers_count}
                  </div>

                  {/* Repository name */}
                  <h3 className="project-title">{repo.name}</h3>

                  {/* Repository description */}
                  <p className="project-desc">
                    {repo.description || 'No description available.'}
                  </p>

                  {/* Language tag */}
                  {repo.language && (
                    <div className="project-tech">
                      <span className="tech-tag">{repo.language}</span>
                    </div>
                  )}

                  {/* Repository URL link */}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    View on GitHub →
                  </a>
                </div>
              ))
            ) : (
              <p className="no-results">No repositories found matching "{searchTerm}"</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
