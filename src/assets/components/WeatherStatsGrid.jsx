import './WeatherStatsGrid.css'

const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']

function windLabel(degrees) {
  if (degrees == null) return '—'
  const index = Math.round(degrees / 45) % 8
  return COMPASS[index]
}

function round(value) {
  return value != null ? Math.round(value) : '—'
}

function StatCard({ icon, label, value, unit, hint, wide }) {
  return (
    <div className={`stat-card glass-chip ${wide ? 'stat-card--wide' : ''}`}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">
          {value}
          {unit && <span>{unit}</span>}
        </p>
        {hint && <p className="stat-card__hint">{hint}</p>}
      </div>
    </div>
  )
}

const icon = (path) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
)

function WeatherStatsGrid({ current, today }) {
  if (!current) return null

  return (
    <div className="stats-grid">
      <StatCard
        wide
        icon={icon(<path d="M10 13.5V4a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z" />)}
        label="Percepita"
        value={round(current.feltTemperature)}
        unit="°C"
        hint={today ? `da ${round(today.feltMin)}° a ${round(today.feltMax)}°` : undefined}
      />
      <StatCard
        icon={icon(<path d="M7 16a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.5 1.5H18a3 3 0 0 1 0 6H7Z" />)}
        label="Umidità"
        value={round(current.humidity)}
        unit="%"
      />
      <StatCard
        icon={icon(
          <>
            <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5" />
            <path d="M3 16h14a2.5 2.5 0 1 1-2.5 2.5" />
          </>
        )}
        label="Vento"
        value={round(current.windspeed)}
        unit=" km/h"
        hint={windLabel(current.winddirection)}
      />
      <StatCard
        icon={icon(<path d="M12 3a5 5 0 0 0-5 5c0 3 2 4 2 7h6c0-3 2-4 2-7a5 5 0 0 0-5-5ZM10 19h4M11 22h2" />)}
        label="Indice UV"
        value={round(current.uvindex)}
      />
      <StatCard
        icon={icon(
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l3 2" />
          </>
        )}
        label="Pressione"
        value={round(current.pressure)}
        unit=" hPa"
      />
      <StatCard
        icon={icon(
          <>
            <path d="M6 13h12a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A4.5 4.5 0 0 0 6 13Z" />
            <path d="M9 17l-1 3M15 17l-1 3" />
          </>
        )}
        label="Probabilità pioggia"
        value={round(current.precipitationProbability)}
        unit="%"
      />
    </div>
  )
}

export default WeatherStatsGrid
