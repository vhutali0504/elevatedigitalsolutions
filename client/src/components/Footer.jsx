import { Link } from 'react-router-dom'
import { SITE, whatsappLink } from '../data/site'
import { Logo } from './Wordmark'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cols">
        <div>
          <p className="footer__head">{SITE.name}</p>
          <p>A freelance web development partnership.</p>
          <p>{SITE.city}</p>
        </div>
        <div>
          <p className="footer__head">The site</p>
          <Link className="link" to="/#packages">Packages</Link>
          <Link className="link" to="/#process">How it works</Link>
          <Link className="link" to="/#about">About</Link>
          <Link className="link" to="/#faq">FAQ</Link>
        </div>
        <div>
          <p className="footer__head">Talk to us</p>
          <a className="link" href={`mailto:${SITE.email}`}>Email</a>
          <a className="link" href={whatsappLink('Hi EDS, I would like to talk about a website.')} target="_blank" rel="noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
          <Link className="link" to="/#contact">Contact form</Link>
        </div>
        <div>
          <p className="footer__head">The small print</p>
          <Link className="link" to="/privacy">Privacy policy</Link>
          <Link className="link" to="/terms">Terms of service</Link>
          <Link className="link" to="/refunds">Refund policy</Link>
          <Link className="link" to="/cookies">Cookie policy</Link>
          <Link className="link" to="/credits">Picture credits</Link>
        </div>
      </div>
      <Logo variant="full" className="footer__word" label="EDS, Elevate Digital Solutions" />
      <p className="footer__legal">© {new Date().getFullYear()} {SITE.name}. Prices in South African rand.</p>
    </footer>
  )
}
