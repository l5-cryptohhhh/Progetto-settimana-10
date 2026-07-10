import { buildForecastUrl, buildMeteogramUrl } from './config'

export async function getForecast(city) {
  const res = await fetch(buildForecastUrl(city))
  if (!res.ok) throw new Error(`Forecast fetch failed (${res.status})`)
  const data = await res.json()

  const hourly = data.data_1h
  const daily = data.data_day

  const current = hourly
    ? {
        time: hourly.time?.[0],
        temperature: hourly.temperature?.[0],
        feltTemperature: hourly.felttemperature?.[0],
        windspeed: hourly.windspeed?.[0],
        winddirection: hourly.winddirection?.[0],
        humidity: hourly.relativehumidity?.[0],
        pressure: hourly.sealevelpressure?.[0],
        uvindex: hourly.uvindex?.[0],
        precipitation: hourly.precipitation?.[0],
        precipitationProbability: hourly.precipitation_probability?.[0],
        pictocode: hourly.pictocode?.[0],
        isDaylight: hourly.isdaylight?.[0] === 1,
      }
    : null

  const today = daily?.time
    ? {
        tempMean: daily.temperature_mean?.[0],
        feltMax: daily.felttemperature_max?.[0],
        feltMin: daily.felttemperature_min?.[0],
        humidityMean: daily.relativehumidity_mean?.[0],
        windMax: daily.windspeed_max?.[0],
        pressureMean: daily.sealevelpressure_mean?.[0],
        uvindex: daily.uvindex?.[0],
        precipitationProbability: daily.precipitation_probability?.[0],
        precipitationHours: daily.precipitation_hours?.[0],
        predictability: daily.predictability?.[0],
      }
    : null

  const days = daily?.time
    ? daily.time.map((time, i) => ({
        time,
        tempMax: daily.temperature_max?.[i],
        tempMin: daily.temperature_min?.[i],
        precipitation: daily.precipitation?.[i],
        precipitationProbability: daily.precipitation_probability?.[i],
        pictocode: daily.pictocode?.[i],
      }))
    : []

  return { current, today, days }
}

export function getMeteogramUrl(city) {
  return buildMeteogramUrl(city)
}
