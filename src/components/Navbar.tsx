import { useEffect, useState } from 'react';
import Logo from './Logo';
import { AppLink } from '../router';
import { openCalModal } from '../booking/cal';
import './Navbar.css';

const links = [
  { href: '/#how', label: 'Jak to działa' },
  { href: '/#cases', label: 'Zastosowania' },
  { href: '/#pricing', label: 'Cennik' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <AppLink to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <Logo />
          <span>Callnest</span>
        </AppLink>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map((link) => (
            <AppLink
              key={link.href}
              to={link.href}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </AppLink>
          ))}
        </div>

        <AppLink
          to="/#cta"
          className="btn btn--nav navbar__cta"
          onClick={(event) => {
            event.preventDefault();
            setMenuOpen(false);
            openCalModal();
          }}
        >
          Umów demo
        </AppLink>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
