import { useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'eds-cookie-notice'

const alreadySeen = () => {
  try {
    return Boolean(localStorage.getItem(KEY))
  } catch {
    return false
  }
}

// The site sets no tracking cookies, so this informs rather than asks for a choice that
// would change nothing. If analytics is ever added, this must become an opt-in first.
export default function ConsentBanner() {
  const [show, setShow] = useState(() => !alreadySeen())
  if (!show) return null
  const dismiss = () => {
    try {
      localStorage.setItem(KEY, 'seen')
    } catch {
      // Private browsing can block storage. The notice just returns next visit.
    }
    setShow(false)
  }
  return (
    <aside className="consent" aria-label="Cookie notice">
      <p>We don't use tracking or advertising cookies. We only remember that you've seen this note. <Link className="link" to="/cookies">Cookie policy</Link></p>
      <button type="button" className="btn btn--small" onClick={dismiss}>Got it</button>
    </aside>
  )
}
