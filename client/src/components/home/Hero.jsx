import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MiniSite from '../MiniSite'
import { Line } from '../Reveal'
import { SAMPLES } from '../../data/samples'

const SCENES = [
  { sample: SAMPLES.plumbing, blocks: ['map', 'contact', 'whatsapp', 'promo'] },
  { sample: SAMPLES.barber, blocks: ['pages', 'booking', 'whatsapp', 'motion'] },
  { sample: SAMPLES.bakery, blocks: ['cart', 'products', 'payments', 'whatsapp'] },
]

const TYPE_MS = 65
const ACT_AFTER_MS = 2600
const NEXT_AFTER_MS = 6200

export default function Hero() {
  const reduced = useReducedMotion()
  const stage = useRef(null)
  const inView = useInView(stage)
  const [paused, setPaused] = useState(false)
  const [scene, setScene] = useState(0)
  const [typed, setTyped] = useState(0)
  const [step, setStep] = useState(0)
  const running = inView && !paused && !reduced

  const { sample, blocks } = SCENES[scene]
  const finished = typed >= sample.name.length

  // Type the business name, one letter at a time.
  useEffect(() => {
    if (!running || finished) return
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
    return () => clearTimeout(t)
  }, [running, finished, typed])

  // Then play a visitor using the site, then move on to the next business.
  useEffect(() => {
    if (!running || !finished) return
    const act = setTimeout(() => setStep(1), ACT_AFTER_MS)
    const next = setTimeout(() => {
      setStep(0)
      setTyped(0)
      setScene((s) => (s + 1) % SCENES.length)
    }, NEXT_AFTER_MS)
    return () => {
      clearTimeout(act)
      clearTimeout(next)
    }
  }, [running, finished, scene])

  // With motion off, or paused mid-word, show a complete site rather than half a name.
  const name = reduced || paused ? sample.name : sample.name.slice(0, typed)

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__aside">
        <div className="hero__note">
          <p>The businesses in this demo are made up. The website is real code, running live.</p>
          {!reduced && (
            <button type="button" className="link" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
              {paused ? 'Play the demo' : 'Pause the demo'}
            </button>
          )}
        </div>
        <div className="hero__pitch">
          <p className="lead">EDS (Elevate Digital Solutions) is a freelance web development partnership in Johannesburg, building websites, booking systems and online stores for South African businesses.</p>
          <Link to="/#packages" className="btn">Build your quote</Link>
        </div>
      </div>

      <div className="hero__stage" ref={stage} role="img" aria-label="A small sample website building itself: a plumber's landing page, a barber's booking site and a bakery's online store.">
        <div aria-hidden="true" className="hero__frame">
          <MiniSite sample={sample} name={name} blocks={blocks} step={step} caret={!finished && running} />
        </div>
      </div>

      <h1 className="hero__title lines is-in" id="hero-title">
        <Line i={0}>Your website,</Line>
        <Line i={1}>from R2,500.</Line>
      </h1>
    </section>
  )
}
