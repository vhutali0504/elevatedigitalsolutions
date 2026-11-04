import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { whatsappLink } from '../data/site'

// Phones only (see site.css). Arrives after the hero, whose own button covers the first screen.
export default function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`mobilebar ${show ? 'is-on' : ''}`} aria-hidden={!show} inert={!show}>
      <Link to="/#packages" className="btn">Build your quote</Link>
      <a className="btn btn--quiet" href={whatsappLink('Hi EDS, I would like to talk about a website.')} target="_blank" rel="noreferrer">WhatsApp</a>
    </div>
  )
}
