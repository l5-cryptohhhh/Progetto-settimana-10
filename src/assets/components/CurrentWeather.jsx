import WeatherIcon, { weatherLabel, severeWeatherReason } from './WeatherIcon'
import WeatherAlertBadge from './WeatherAlertBadge'
import './CurrentWeather.css'

function formatTime(iso) {
  if (!iso) return ''
  const date = new Date(iso.replace(' ', 'T'))
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString('it-IT', { weekday: 'long', hour: '2-digit', minute: '2-digit' })
}

function CurrentWeather({ city, current }) {
  if (!current) return null

  return (
    <section className="current-weather">
      <WeatherAlertBadge reason={severeWeatherReason(current)} />
      <div className="current-weather__place">
        <p className="current-weather__eyebrow">{formatTime(current.time)}</p>
        <h1 className="current-weather__city">{city.name}</h1>
        <p className="current-weather__country">{city.country}</p>
      </div>

      <div className="current-weather__reading">
        <WeatherIcon pictocode={current.pictocode} size={64} />
        <div>
          <p className="current-weather__temp">
            {current.temperature != null ? Math.round(current.temperature) : '—'}
            <span>°C</span>
          </p>
          <p className="current-weather__desc">{weatherLabel(current.pictocode)}</p>
        </div>
      </div>

      <dl className="current-weather__stats">
        <div>
          <dt>Vento</dt>
          <dd>{current.windspeed != null ? `${current.windspeed} km/h` : '—'}</dd>
        </div>
        <div>
          <dt>Precipitazioni</dt>
          <dd>{current.precipitation != null ? `${current.precipitation} mm` : '—'}</dd>
        </div>
      </dl>
    </section>
  )
}

export default CurrentWeather
