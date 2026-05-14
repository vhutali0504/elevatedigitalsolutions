import { useState, useEffect } from 'react'
import '../styles/Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'How we work', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#home" className="navbar__logo">
        <span className="navbar__logo-elevate">ELEVATE</span>
        <span className="navbar__logo-divider" />
        <span className="navbar__logo-ds">DIGITAL SOLUTIONS</span>
      </a>

      <ul className="navbar__links">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="btn-primary navbar__cta">
        Get a quote
      </a>

      <button
        className="navbar__burger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div className="navbar__mobile">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </a>
        </div>
      )}
    </nav>
  )
}