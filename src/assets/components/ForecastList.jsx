import WeatherIcon, { severeWeatherReason } from './WeatherIcon'
import WeatherAlertBadge from './WeatherAlertBadge'
import './ForecastList.css'

function formatDay(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })
}

function ForecastList({ days }) {
  if (!days?.length) return null

  return (
    <section className="forecast-list">
      <h2 className="forecast-list__title">Prossimi giorni</h2>
      <ul className="forecast-list__grid">
        {days.map((day) => (
          <li key={day.time} className="forecast-day glass-chip">
            <WeatherAlertBadge reason={severeWeatherReason(day)} size="sm" />
            <p className="forecast-day__label">{formatDay(day.time)}</p>
            <WeatherIcon pictocode={day.pictocode} size={32} />
            <p className="forecast-day__temps">
              <span className="forecast-day__max">{day.tempMax != null ? Math.round(day.tempMax) : '—'}°</span>
              <span className="forecast-day__min">{day.tempMin != null ? Math.round(day.tempMin) : '—'}°</span>
            </p>
            {day.precipitationProbability != null && (
              <p className="forecast-day__precip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z" />
                </svg>
                {Math.round(day.precipitationProbability)}%
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ForecastList
