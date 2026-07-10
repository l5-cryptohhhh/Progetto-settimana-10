import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../assets/components/Navbar'
import Footer from '../assets/components/Footer'
import CurrentWeather from '../assets/components/CurrentWeather'
import WeatherStatsGrid from '../assets/components/WeatherStatsGrid'
import ForecastList from '../assets/components/ForecastList'
import Meteogram from '../assets/components/Meteogram'
import cities from '../assets/data/cities.json'
import { getForecast } from '../api/weatherApi'
import './CityDetailPage.css'

function CityDetailPage() {
  const { citySlug } = useParams()
  const city = cities.find((c) => c.slug === citySlug)

  const [status, setStatus] = useState('loading')
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    if (!city) return
    setStatus('loading')
    getForecast(city)
      .then((data) => {
        setForecast(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [city])

  return (
    <>
      <Navbar />
      <main className="container detail-page">
        {!city && (
          <div className="detail-page__state">
            <p>Città non trovata.</p>
            <Link to="/cerca">Torna alla ricerca</Link>
          </div>
        )}

        {city && status === 'loading' && <p className="detail-page__state">Caricamento meteo per {city.name}…</p>}

        {city && status === 'error' && (
          <div className="detail-page__state">
            <p>Impossibile recuperare il meteo per {city.name} al momento.</p>
            <Link to="/cerca">Torna alla ricerca</Link>
          </div>
        )}

        {city && status === 'ready' && forecast && (
          <>
            <div className="detail-page__top">
              <CurrentWeather city={city} current={forecast.current} />
            </div>
            <div className="detail-page__secondary">
              <WeatherStatsGrid current={forecast.current} today={forecast.today} />
              <Meteogram city={city} />
              <ForecastList days={forecast.days} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default CityDetailPage
