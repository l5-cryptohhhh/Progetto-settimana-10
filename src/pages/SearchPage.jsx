import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../assets/components/Navbar'
import Footer from '../assets/components/Footer'
import CitySearchForm from '../assets/components/CitySearchForm'
import cities from '../assets/data/cities.json'
import './SearchPage.css'

function findMatches(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return cities.filter(
    (city) => city.name.toLowerCase().includes(q) || city.country.toLowerCase().includes(q)
  )
}

function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  function handleSearch(value) {
    setQuery(value)
    setResults(findMatches(value))
  }

  return (
    <>
      <Navbar />
      <main className="container search-page">
        <h1 className="search-page__title">Cerca una città</h1>
        <p className="search-page__hint">Premi Invio o Cerca per avviare la ricerca.</p>
        <CitySearchForm onSearch={handleSearch} />

        {results === null && (
          <p className="search-page__empty">Digita il nome di una città o di un paese per iniziare.</p>
        )}

        {results !== null && results.length === 0 && (
          <p className="search-page__empty">Nessuna città trovata per "{query}".</p>
        )}

        {results !== null && results.length > 0 && (
          <ul className="search-page__results">
            {results.map((city) => (
              <li key={city.slug}>
                <button
                  type="button"
                  className="search-result glass-chip"
                  onClick={() => navigate(`/citta/${city.slug}`)}
                >
                  <span className="search-result__name">{city.name}</span>
                  <span className="search-result__country">{city.country}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  )
}

export default SearchPage
