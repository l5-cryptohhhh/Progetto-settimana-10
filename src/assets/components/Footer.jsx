import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">ilMeteo</p>
        <p className="footer__note">
          Dati meteo forniti da{' '}
          <a href="https://www.meteoblue.com" target="_blank" rel="noreferrer">
            meteoblue
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
