import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../assets/components/Navbar'
import Hero from '../assets/components/Hero'
import Footer from '../assets/components/Footer'
import CurrentWeather from '../assets/components/CurrentWeather'
import ItalyWindMap from '../assets/components/ItalyWindMap'
import WeatherStatsGrid from '../assets/components/WeatherStatsGrid'
import Meteogram from '../assets/components/Meteogram'
import ForecastList from '../assets/components/ForecastList'
import cities from '../assets/data/cities.json'
import { getForecast } from '../api/weatherApi'
import './HomePage.css'

const DEFAULT_SLUG = 'roma'

function HomePage() {
  const [selectedSlug, setSelectedSlug] = useState(DEFAULT_SLUG)
  const [status, setStatus] = useState('loading')
  const [forecast, setForecast] = useState(null)

  const city = cities.find((c) => c.slug === selectedSlug)
  const selectable = cities.filter((c) => c.country === 'Italia')
  const selectableIndex = selectable.findIndex((c) => c.slug === selectedSlug)
  const featuredTrackRef = useRef(null)
  const isFirstLoad = status === 'loading' && !forecast
  const isRefreshing = status === 'loading' && !!forecast

  function stepCity(direction) {
    const next = (selectableIndex + direction + selectable.length) % selectable.length
    setSelectedSlug(selectable[next].slug)
  }

  function scrollFeatured(direction) {
    featuredTrackRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' })
  }

  useEffect(() => {
    setStatus('loading')
    getForecast(city)
      .then((data) => {
        setForecast(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
    // city is derived from selectedSlug each render; depending on it directly would refetch on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlug])

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="container city-weather">
          <div className="city-weather__heading">
            <h2>Meteo a {city.name}</h2>
            <Link to={`/citta/${city.slug}`} className="city-weather__link">
              Dettagli completi
            </Link>
          </div>

          {isFirstLoad && <p className="city-weather__state">Caricamento meteo per {city.name}…</p>}
          {status === 'error' && !forecast && <p className="city-weather__state">Impossibile recuperare il meteo al momento.</p>}
          {status === 'error' && forecast && (
            <p className="city-weather__state city-weather__state--inline">
              Impossibile aggiornare il meteo, mostro l'ultimo dato disponibile.
            </p>
          )}

          {forecast && (
            <>
              <div className={`city-weather__top ${isRefreshing ? 'is-refreshing' : ''}`}>
                <button
                  type="button"
                  className="city-weather__nav glass-chip"
                  onClick={() => stepCity(-1)}
                  disabled={isRefreshing}
                  aria-label="Città precedente"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <CurrentWeather key={city.slug} city={city} current={forecast.current} />
                <button
                  type="button"
                  className="city-weather__nav glass-chip"
                  onClick={() => stepCity(1)}
                  disabled={isRefreshing}
                  aria-label="Città successiva"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <ItalyWindMap />
              <div className={`city-weather__secondary ${isRefreshing ? 'is-refreshing' : ''}`}>
                <WeatherStatsGrid current={forecast.current} today={forecast.today} />
                <Meteogram city={city} />
              </div>
            </>
          )}

          {forecast && <ForecastList days={forecast.days} />}
        </section>

        <section className="container featured">
          <h2 className="featured__title">Cambia città</h2>
          <p className="featured__hint">Scegli una città per aggiornare il meteo qui sopra.</p>
          <div className="featured__carousel">
            <button
              type="button"
              className="featured__nav city-weather__nav glass-chip featured__nav--prev"
              onClick={() => scrollFeatured(-1)}
              aria-label="Scorri indietro"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <ul className="featured__track" ref={featuredTrackRef}>
              {selectable.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    className={`featured__item glass-chip ${c.slug === selectedSlug ? 'is-active' : ''}`}
                    aria-pressed={c.slug === selectedSlug}
                    onClick={() => setSelectedSlug(c.slug)}
                  >
                    <span className="featured__name">{c.name}</span>
                    <span className="featured__country">{c.country}</span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="featured__nav city-weather__nav glass-chip featured__nav--next"
              onClick={() => scrollFeatured(1)}
              aria-label="Scorri avanti"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomePage
