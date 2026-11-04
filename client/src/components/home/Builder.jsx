import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import MiniSite from '../MiniSite'
import Reveal, { Line } from '../Reveal'
import { CARE_PLAN, CATEGORIES, formatRand } from '../../data/packages'
import { SAMPLES } from '../../data/samples'
import { whatsappLink } from '../../data/site'
import { zigzag } from '../../data/zigzag'

function Rand({ value }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const shown = useRef(value)
  useEffect(() => {
    const node = ref.current
    if (reduced) {
      node.textContent = formatRand(value)
      shown.current = value
      return
    }
    const controls = animate(shown.current, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        shown.current = v
        node.textContent = formatRand(Math.round(v / 10) * 10)
      },
    })
    return () => controls.stop()
  }, [value, reduced])
  return <span ref={ref}>{formatRand(value)}</span>
}

const cleanName = (s) => s.replace(/[<>]/g, '').slice(0, 32)

export default function Builder({ pick, onQuote }) {
  const [name, setName] = useState('')
  const [catId, setCatId] = useState('landing')
  const [tierId, setTierId] = useState('standard')
  const [care, setCare] = useState(false)
  const [phone, setPhone] = useState(false)

  // A choice made in the "What we build" list lands here.
  const [seenPick, setSeenPick] = useState(pick)
  if (pick !== seenPick) {
    setSeenPick(pick)
    if (pick) {
      setCatId(pick.cat)
      setTierId(pick.tier)
    }
  }

  const cat = CATEGORIES.find((c) => c.id === catId)
  const tier = cat.tiers.find((t) => t.id === tierId) ?? cat.tiers[0]
  const sample = SAMPLES[cat.sample]
  const time = tier.time ?? cat.time
  const prefix = tier.from ? 'From ' : ''

  const chooseCat = (id) => {
    const next = CATEGORIES.find((c) => c.id === id)
    setCatId(id)
    setTierId(next.tiers[0].id)
  }

  const summary = useMemo(() => {
    const parts = [
      `Business: ${name || 'not named yet'}`,
      `Package: ${cat.label}, ${tier.name}, ${prefix.toLowerCase()}${formatRand(tier.price)}`,
      `Estimated time: ${time}`,
    ]
    if (care) parts.push(`Care plan: yes, ${formatRand(CARE_PLAN.price)} a month`)
    return parts.join('\n')
  }, [name, cat, tier, prefix, time, care])

  return (
    <section className="builder" id="packages" aria-labelledby="builder-title">
      <Reveal className="builder__intro">
        <h2 id="builder-title" className="lines head"><Line>Pick a package.</Line><Line i={1}>Watch it build.</Line></h2>
        <p className="lead rise" style={{ '--i': 2 }}>Straightforward prices with no surprises. Type your business name, choose what you need, and the site and the quote change as you go.</p>
      </Reveal>

      <div className="builder__grid">
        <form className="builder__controls" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="biz-name">Your business name</label>
            <input
              id="biz-name"
              value={name}
              maxLength={32}
              autoComplete="organization"
              placeholder="Type it here"
              onChange={(e) => setName(cleanName(e.target.value))}
            />
          </div>

          <fieldset className="segments">
            <legend>What do you need?</legend>
            <div className="segments__row">
              {CATEGORIES.map((c) => (
                <label key={c.id} className={`segment ${c.id === catId ? 'is-on' : ''}`}>
                  <input type="radio" name="category" value={c.id} checked={c.id === catId} onChange={() => chooseCat(c.id)} />
                  {c.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="tiers">
            <legend>Which package?</legend>
            {cat.tiers.map((t) => (
              <label key={t.id} className={`tier ${t.id === tier.id ? 'is-on' : ''}`}>
                <input type="radio" name="tier" value={t.id} checked={t.id === tier.id} onChange={() => setTierId(t.id)} />
                <span className="tier__top">
                  <span className="tier__name">{t.name}</span>
                  <span className="tier__price">{t.from ? 'From ' : ''}{formatRand(t.price)}</span>
                </span>
                <span className="tier__desc">{t.desc}</span>
                <ul className="tier__features" hidden={t.id !== tier.id}>
                  {t.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </label>
            ))}
          </fieldset>
        </form>

        <div className="builder__preview">
          <div className="builder__preview-top">
            <p>A sample of your {cat.label.toLowerCase()}</p>
            <div className="device" role="group" aria-label="Preview size">
              <button type="button" className={!phone ? 'is-on' : ''} aria-pressed={!phone} onClick={() => setPhone(false)}>Desktop</button>
              <button type="button" className={phone ? 'is-on' : ''} aria-pressed={phone} onClick={() => setPhone(true)}>Phone</button>
            </div>
          </div>
          <div
            className="builder__frame"
            role="img"
            aria-label={`Sample ${cat.label.toLowerCase()} for ${name || 'your business'}, ${tier.name} package.`}
          >
            <div aria-hidden="true" className={`builder__device ${phone ? 'is-phone' : ''}`}>
              <MiniSite sample={sample} name={name || sample.name} blocks={tier.blocks} phone={phone} />
            </div>
          </div>
        </div>

        <aside className="slip builder__slip" style={{ clipPath: zigzag }} aria-label="Your quote" aria-live="polite">
          <p className="slip__title">Your quote</p>
          <p className="slip__sub">{name || 'Your business'}</p>
          <dl className="slip__rows">
            <div><dt>{cat.label}, {tier.name}</dt><dd>{prefix}<Rand value={tier.price} /></dd></div>
            <div><dt>Support included</dt><dd>{tier.support ? `${tier.support} month${tier.support > 1 ? 's' : ''}` : 'None'}</dd></div>
            <div><dt>Time to launch</dt><dd>{time}</dd></div>
            <div><dt>Deposit to start</dt><dd>{prefix}<Rand value={tier.price / 2} /></dd></div>
            <div><dt>Balance on delivery</dt><dd>{prefix}<Rand value={tier.price / 2} /></dd></div>
          </dl>
          <label className="slip__care">
            <input type="checkbox" checked={care} onChange={(e) => setCare(e.target.checked)} />
            <span>Add the care plan, {formatRand(CARE_PLAN.price)} a month<small>{CARE_PLAN.features.join('. ')}.</small></span>
          </label>
          <p className="slip__total"><span>Total</span><b>{prefix}<Rand value={tier.price} /></b></p>
          <p className="slip__small">{care ? `Plus ${formatRand(CARE_PLAN.price)} a month for the care plan. ` : ''}An estimate until we've agreed your scope.</p>
          <button type="button" className="btn btn--full" onClick={() => onQuote(cat.service, summary)}>Send us this quote</button>
          <a className="slip__wa link" href={whatsappLink(`Hi EDS, I'd like to talk about this quote.\n${summary}`)} target="_blank" rel="noreferrer">Or send it on WhatsApp</a>
        </aside>
      </div>
    </section>
  )
}
