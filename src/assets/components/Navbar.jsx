import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <Logo size={30} />
          ilMeteo
        </Link>
        <nav className="navbar__nav" aria-label="Navigazione principale">
          <NavLink to="/" end className="navbar__link">
            Home
          </NavLink>
          <NavLink to="/cerca" className="navbar__cta glass-btn">
            Cerca
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
