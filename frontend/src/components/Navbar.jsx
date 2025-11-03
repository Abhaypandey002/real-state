import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">DreamNest</span>
        <button className="navbar__toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
          Home
        </Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''} onClick={closeMenu}>
          Projects
        </Link>
        <Link
          to="/book-appointment"
          className={location.pathname === '/book-appointment' ? 'active' : ''}
          onClick={closeMenu}
        >
          Book Appointment
        </Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
          Contact Us
        </Link>
        <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''} onClick={closeMenu}>
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
