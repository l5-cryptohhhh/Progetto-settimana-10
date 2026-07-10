export const METEOBLUE_API_KEY = import.meta.env.VITE_METEOBLUE_API_KEY

export const FORECAST_URL = 'https://my.meteoblue.com/packages/basic-1h_basic-day'
export const METEOGRAM_URL = 'https://my.meteoblue.com/images/meteogram'

export function buildForecastUrl({ lat, lon, asl }) {
  const params = new URLSearchParams({
    apikey: METEOBLUE_API_KEY,
    lat,
    lon,
    asl,
    format: 'json',
  })
  return `${FORECAST_URL}?${params}`
}

export function buildMeteogramUrl({ lat, lon, asl, tz, name }) {
  const params = new URLSearchParams({
    lat,
    lon,
    asl,
    tz,
    apikey: METEOBLUE_API_KEY,
    format: 'png',
    dpi: 72,
    lang: 'en',
    temperature_units: 'C',
    precipitation_units: 'mm',
    windspeed_units: 'kmh',
    location_name: name,
  })
  return `${METEOGRAM_URL}?${params}`
}
