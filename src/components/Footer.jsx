import logo from '../assets/logo.png'
import '../styles/Footer.css'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <img src={logo} alt="Elevate Digital Solutions" className="footer__logo-img" />
            <span className="footer__logo-text">
              <span className="footer__logo-elevate">ELEVATE</span>
              <span className="footer__logo-ds">DIGITAL SOLUTIONS</span>
            </span>
          </a>
          <p className="footer__tagline">
            Professional websites, booking systems, and online stores for
            South African businesses.
          </p>
        </div>

        <div className="footer__nav">
          <div className="footer__nav-title">Navigation</div>
          <ul>
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__nav">
          <div className="footer__nav-title">Contact</div>
          <ul>
            <li>
              <a
                href="https://wa.me/27648457070"
                target="_blank"
                rel="noreferrer"
                className="footer__contact-item"
              >
                <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.428a.75.75 0 0 0 .915.915l5.573-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 0 1-4.964-1.364l-.355-.212-3.686.972.987-3.608-.231-.372A9.696 9.696 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@elevate-digitalsolutions.co.za"
                className="footer__contact-item"
              >
                <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                hello@elevate-digitalsolutions.co.za
              </a>
            </li>
            <li className="footer__contact-item">
              <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Johannesburg, South Africa
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Elevate Digital Solutions. All rights reserved.</span>
        <span className="footer__legal">
          Registered in South Africa · POPIA compliant
        </span>
      </div>
    </footer>
  )
}