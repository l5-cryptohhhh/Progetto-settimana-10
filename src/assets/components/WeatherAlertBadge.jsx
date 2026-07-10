import { useState } from 'react'
import './WeatherAlertBadge.css'

function WeatherAlertBadge({ reason, size = 'lg' }) {
  const [open, setOpen] = useState(false)

  if (!reason) return null

  return (
    <span className={`weather-alert ${size === 'sm' ? 'weather-alert--sm' : ''}`}>
      <button
        type="button"
        className="weather-alert__badge"
        aria-label={reason}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        !
      </button>
      {open && (
        <span role="tooltip" className="weather-alert__popup">
          {reason}
        </span>
      )}
    </span>
  )
}

export default WeatherAlertBadge
