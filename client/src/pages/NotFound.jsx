import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Line } from '../components/Reveal'

export default function NotFound() {
  usePageMeta({ title: 'Page not found | Elevate Digital Solutions', description: 'This page does not exist.', path: '/404', noindex: true })
  return (
    <section className="simple">
      <h1 className="lines head is-in reveal"><Line>This page isn't</Line><Line i={1}>on the map.</Line></h1>
      <p className="lead">The link may be old, or there may be a typo in it. Everything we do is on the home page.</p>
      <div className="simple__actions">
        <Link to="/" className="btn">Back to the home page</Link>
        <Link className="link" to="/#contact">Contact us</Link>
      </div>
    </section>
  )
}
