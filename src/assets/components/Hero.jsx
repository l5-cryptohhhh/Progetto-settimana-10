import { useNavigate } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero__scrim" />
      <div className="container hero__content">
        <h1 className="hero__title">Il meteo del mondo, in un istante.</h1>
        <p className="hero__subtitle">
          Cerca una città, ovunque nel mondo, e scopri condizioni attuali e previsioni dei prossimi giorni.
        </p>
        <button type="button" className="hero__cta glass-btn" onClick={() => navigate('/cerca')}>
          Cerca una città
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Hero
