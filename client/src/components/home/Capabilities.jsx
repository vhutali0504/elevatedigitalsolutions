import Reveal, { Line } from '../Reveal'

const ROWS = [
  { name: 'Landing pages', price: 'from R2,500', cat: 'landing', tier: 'basic' },
  { name: 'Business websites', price: 'from R7,500', cat: 'business', tier: 'starter' },
  { name: 'Booking systems', price: 'from R12,000', cat: 'business', tier: 'professional' },
  { name: 'Online stores', price: 'from R18,000', cat: 'store', tier: 'store' },
  { name: 'Portals and dashboards', price: 'from R18,000', cat: 'business', tier: 'custom' },
]

export default function Capabilities({ onPick }) {
  return (
    <section className="caps" aria-labelledby="caps-title">
      <Reveal className="caps__intro">
        <h2 id="caps-title" className="lines caps__title"><Line>What we build</Line></h2>
        <p className="rise" style={{ '--i': 1 }}>Everything comes mobile responsive, with a real person you can call. Pick one to see it built and priced below.</p>
      </Reveal>
      <Reveal as="ul" className="caps__list">
        {ROWS.map((row, i) => (
          <li key={row.name}>
            <button type="button" className="caps__row" onClick={() => onPick(row.cat, row.tier)}>
              <span className="line"><span className="line__in caps__name" style={{ '--i': i }}>{row.name}</span></span>
              <span className="caps__price">{row.price}</span>
            </button>
          </li>
        ))}
      </Reveal>
      <Reveal className="caps__also">
        <p className="rise">Already have a site? We do redesigns too, quoted once we've seen what's not working.</p>
      </Reveal>
    </section>
  )
}
