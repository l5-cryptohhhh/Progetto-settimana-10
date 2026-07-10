import { useState } from 'react'
import './CitySearchForm.css'

function CitySearchForm({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form className="city-search" role="search" onSubmit={handleSubmit}>
      <label htmlFor="city-search-input" className="city-search__label">
        Cerca una città
      </label>
      <div className="city-search__row">
        <input
          id="city-search-input"
          type="text"
          className="city-search__input"
          placeholder="Es. Roma, Tokyo, New York…"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="city-search__button glass-btn">
          Cerca
        </button>
      </div>
    </form>
  )
}

export default CitySearchForm
