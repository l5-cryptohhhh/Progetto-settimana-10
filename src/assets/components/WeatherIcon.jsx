// ponytail: meteoblue pictocode has 35 exact codes, bucketed to 6 visual categories here
function categoryFor(pictocode) {
  if (pictocode == null) return 'unknown'
  if (pictocode <= 2) return 'clear'
  if (pictocode <= 4) return 'partly-cloudy'
  if (pictocode <= 7) return 'cloudy'
  if (pictocode <= 11) return 'rain'
  if (pictocode <= 15) return 'storm'
  return 'snow'
}

const ICONS = {
  clear: (
    <circle cx="12" cy="12" r="5" />
  ),
  'partly-cloudy': (
    <>
      <circle cx="9" cy="10" r="4" />
      <path d="M4 17h13a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.5" />
    </>
  ),
  cloudy: <path d="M6 17h12a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A4.5 4.5 0 0 0 6 17Z" />,
  rain: (
    <>
      <path d="M6 14h12a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A4.5 4.5 0 0 0 6 14Z" />
      <path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" />
    </>
  ),
  storm: (
    <>
      <path d="M6 13h12a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A4.5 4.5 0 0 0 6 13Z" />
      <path d="M13 13l-3 5h3l-2 4" />
    </>
  ),
  snow: (
    <>
      <path d="M6 13h12a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A4.5 4.5 0 0 0 6 13Z" />
      <path d="M9 17v4M9 19l-2 1M9 19l2 1M15 17v4M15 19l-2 1M15 19l2 1" />
    </>
  ),
  unknown: <path d="M6 17h12a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A4.5 4.5 0 0 0 6 17Z" />,
}

const LABELS = {
  clear: 'Sereno',
  'partly-cloudy': 'Parzialmente nuvoloso',
  cloudy: 'Nuvoloso',
  rain: 'Pioggia',
  storm: 'Temporale',
  snow: 'Neve',
  unknown: 'N/D',
}

function WeatherIcon({ pictocode, size = 28 }) {
  const category = categoryFor(pictocode)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={LABELS[category]}
    >
      {ICONS[category]}
    </svg>
  )
}

export function weatherLabel(pictocode) {
  return LABELS[categoryFor(pictocode)]
}

// ponytail: adverse = storm/snow category, or high wind, or high rain probability
export function severeWeatherReason({ pictocode, windspeed, precipitationProbability } = {}) {
  const category = categoryFor(pictocode)
  if (category === 'storm') return 'Allerta meteo: previsto un temporale.'
  if (category === 'snow') return 'Allerta meteo: previste nevicate.'
  if (windspeed != null && windspeed >= 60) return 'Allerta meteo: vento forte previsto.'
  if (precipitationProbability != null && precipitationProbability >= 75) return 'Allerta meteo: alta probabilità di pioggia intensa.'
  return null
}

export function isSevereWeather(data) {
  return severeWeatherReason(data) != null
}

export default WeatherIcon
