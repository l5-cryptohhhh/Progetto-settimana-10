import { useState } from 'react'
import { getMeteogramUrl } from '../../api/weatherApi'
import './Meteogram.css'

function Meteogram({ city }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="meteogram">
      <h2 className="meteogram__title">Andamento orario</h2>
      <div className={`meteogram__frame ${loaded ? 'is-loaded' : ''}`}>
        <img
          src={getMeteogramUrl(city)}
          alt={`Meteogramma orario per ${city.name}`}
          width={1152}
          height={963}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </section>
  )
}

export default Meteogram
