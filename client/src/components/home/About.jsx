import { Link } from 'react-router-dom'
import Reveal from '../Reveal'

const FACTS = [
  ['Started', '2026'],
  ['Based in', 'Johannesburg'],
  ['Working with', 'Businesses anywhere in South Africa'],
  ['Covering', 'Backend, frontend and project management'],
]

const LOCAL = [
  ['PayFast and Yoco payments', 'Stores'],
  ['POPIA-minded forms and data', 'Every site'],
  ['WhatsApp built in', 'Websites'],
  ['Prices in rand', 'Always'],
]

const YOURS = [
  ['The code and the design', 'Yours'],
  ['The domain', 'Yours'],
  ['A walkthrough at launch', 'Included'],
  ['Support after launch', 'Per package'],
]

export default function About() {
  return (
    <section className="about" id="about" aria-label="About Elevate Digital Solutions">
      <Reveal className="about__top">
        <dl className="about__facts">
          {FACTS.map(([k, v], i) => (
            <div key={k} className="rise" style={{ '--i': i }}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <div className="about__copy">
          <p className="statement rise">You talk directly to the people building your site. No account managers, no long email chains.</p>
          <p className="rise" style={{ '--i': 1 }}>We started EDS because too many South African businesses were either overpaying for basic websites or settling for cheap work that hurt their credibility. There's a better way, and it doesn't take an agency's overheads to deliver it.</p>
          <Link to="/#contact" className="btn rise" style={{ '--i': 2 }}>Start a project</Link>
        </div>
      </Reveal>

      <div className="about__bottom">
        <Reveal as="figure" className="about__pic">
          <div className="shutter">
            <img
              src="/images/joburg-ponte.webp"
              width="1400"
              height="930"
              loading="lazy"
              decoding="async"
              alt="Looking straight up the circular core of Ponte City in Johannesburg towards a bright circle of sky."
            />
          </div>
          <figcaption>Looking up inside Ponte City, Johannesburg. Photo: fiverlocker, CC BY-SA 2.0.</figcaption>
        </Reveal>
        <Reveal className="about__lists">
          <div>
            <p className="about__listhead">Made for South Africa</p>
            <ul>{LOCAL.map(([a, b], i) => <li key={a} className="rise" style={{ '--i': i }}><span>{a}</span><span>{b}</span></li>)}</ul>
          </div>
          <div>
            <p className="about__listhead">Yours when it's done</p>
            <ul>{YOURS.map(([a, b], i) => <li key={a} className="rise" style={{ '--i': i + 2 }}><span>{a}</span><span>{b}</span></li>)}</ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
