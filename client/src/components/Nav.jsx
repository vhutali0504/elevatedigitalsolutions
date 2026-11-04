import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Wordmark from './Wordmark'

const LINKS = [
  ['Packages', '/#packages'],
  ['How it works', '/#process'],
  ['About', '/#about'],
  ['FAQ', '/#faq'],
]

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // The bar steps out of the way going down and returns going up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - last) < 8) return
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${hidden && !open ? 'nav--hidden' : ''}`}>
      <Wordmark />
      <nav className={`nav__links ${open ? 'is-open' : ''}`} id="site-menu" aria-label="Main">
        {LINKS.map(([label, to]) => (
          <Link key={to} to={to} className="link" onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
      <div className="nav__end">
        <button
          type="button"
          className="nav__menu link"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <Link to="/#contact" className="btn btn--small" onClick={() => setOpen(false)}>Start a project</Link>
      </div>
    </header>
  )
}
