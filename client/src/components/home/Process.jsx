import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal, { Line } from '../Reveal'
import { zigzag } from '../../data/zigzag'

const GROUPS = [
  {
    when: 'Before we start',
    rows: [
      ['We listen first', 'Your goals', 'We learn about your business and what the site needs to do before we touch a single pixel.'],
      ['Clear scope', 'In writing', 'You get a quote, timeline and scope document. No hidden costs, no vague deliverables.'],
      ['You pay the deposit', '50%', 'Work starts once the deposit is in.'],
    ],
  },
  {
    when: 'While we build',
    rows: [
      ['We get to work', 'Updates', 'Frontend and backend are built in parallel, with progress updates throughout.'],
      ['Your feedback', 'Revisions', 'You review the work and we revise it. No extra charge for reasonable changes.'],
    ],
  },
  {
    when: 'On launch day',
    rows: [
      ['We go live', 'Handover', 'We deploy, hand over everything you need, and walk you through the site.'],
      ['You pay the balance', '50%', 'Your support period starts here.'],
    ],
  },
]

export default function Process() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] })
  // The slip feeds out of the top of the section like a till receipt as you scroll.
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-26%', '0%'])

  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <Reveal className="process__intro">
        <h2 id="process-title" className="lines head"><Line>No guesswork.</Line><Line i={1}>No surprises.</Line></h2>
        <p className="lead rise" style={{ '--i': 2 }}>Every project runs the same way, from the first conversation to launch day, so you always know what happens next and what it costs.</p>
      </Reveal>
      <div className="process__feed" ref={ref}>
        <motion.div className="process__mover" style={{ y }}>
          <ol className="slip process__slip" style={{ clipPath: zigzag }}>
            {GROUPS.map((g) => (
              <li key={g.when}>
                <p className="slip__when">{g.when}</p>
                <ul>
                  {g.rows.map(([what, value, detail]) => (
                    <li key={what} className="itin">
                      <span className="itin__top"><b>{what}</b><i aria-hidden="true" /><span>{value}</span></span>
                      <span className="itin__detail">{detail}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="slip__result">You hold the site, the code and the domain</li>
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
