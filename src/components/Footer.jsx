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
            <span className="footer__logo-elevate">ELEVATE</span>
            <span className="footer__logo-divider" />
            <span className="footer__logo-ds">DIGITAL SOLUTIONS</span>
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
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:hello@elevatedigital.co.za">
                hello@elevatedigital.co.za
              </a>
            </li>
            <li>Johannesburg, South Africa</li>
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