import Logo from './Logo';
import { AppLink } from '../router';
import { useCookieConsent } from './CookieConsent';
import { openCalModal } from '../booking/cal';
import './Footer.css';

const productLinks = [
  { href: '/#cases', label: 'Zastosowania' },
  { href: '/#how', label: 'Jak to działa' },
  { href: '/#pricing', label: 'Cennik' },
];

const companyLinks = [
  { href: '/zgodnosc-i-rodo', label: 'Zgodność i RODO' },
  { href: '/polityka-prywatnosci', label: 'Polityka Prywatności' },
];

export default function Footer() {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <Logo color="#FFFFFF" />
              <span>Callnest</span>
            </div>
            <p className="footer__desc">
              Głosowi agenci AI dla małych i średnich firm w Polsce. Lokalny partner
              technologiczny.
            </p>
          </div>

          <div className="footer__col">
            <div className="footer__heading">Produkt</div>
            <div className="footer__links">
              {productLinks.map((link) => (
                <AppLink key={link.label} to={link.href}>
                  {link.label}
                </AppLink>
              ))}
            </div>
          </div>

          <div className="footer__col footer__col--firma">
            <div className="footer__heading">Firma</div>
            <div className="footer__links">
              {companyLinks.map((link) => (
                <AppLink key={link.label} to={link.href}>
                  {link.label}
                </AppLink>
              ))}
              <button
                type="button"
                className="footer__link-btn"
                onClick={openSettings}
              >
                Ustawienia cookies
              </button>
            </div>
          </div>

          <div className="footer__col">
            <div className="footer__heading">Kontakt</div>
            <div className="footer__links">
              <a href="mailto:jurkunszymon@gmail.com">jurkunszymon@gmail.com</a>
              <AppLink
                to="/#cta"
                onClick={(event) => {
                  event.preventDefault();
                  openCalModal();
                }}
              >
                Umów demo
              </AppLink>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Callnest. Wszelkie prawa zastrzeżone.</span>
          <span>Zgodność z PKE · AI Act · RODO</span>
        </div>
      </div>
    </footer>
  );
}
