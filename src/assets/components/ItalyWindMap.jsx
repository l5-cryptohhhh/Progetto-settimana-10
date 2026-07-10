import './ItalyWindMap.css'

function ItalyWindMap() {
  return (
    <section className="italy-map">
      <h2 className="italy-map__title">Vento in Italia in tempo reale</h2>
      <div className="italy-map__frame">
        <iframe
          title="Mappa interattiva del vento in Italia"
          src="https://embed.windy.com/embed2.html?lat=42.0&lon=12.5&detailLat=42.0&detailLon=12.5&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default ItalyWindMap
