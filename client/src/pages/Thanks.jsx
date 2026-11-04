import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Line } from '../components/Reveal'
import { whatsappLink } from '../data/site'

export default function Thanks() {
  usePageMeta({ title: 'Message sent | Elevate Digital Solutions', description: 'Thanks for your message.', path: '/thanks', noindex: true })
  return (
    <section className="simple">
      <h1 className="lines head is-in reveal"><Line>Thanks.</Line><Line i={1}>Message received.</Line></h1>
      <p className="lead">We'll get back to you within 24 hours. If it's urgent, send us a WhatsApp.</p>
      <div className="simple__actions">
        <Link to="/" className="btn">Back to the home page</Link>
        <a className="link" href={whatsappLink('Hi EDS, I just sent a message through your site.')} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
      </div>
    </section>
  )
}
