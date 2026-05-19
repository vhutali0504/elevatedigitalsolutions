import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import '../styles/HowWeWork.css'

const steps = [
  { number: '01', label: 'Discovery', heading: 'We listen first', desc: 'We learn about your business, goals, and what the site needs to do before we touch a single pixel.' },
  { number: '02', label: 'Proposal', heading: 'Clear scope', desc: 'You get a quote, timeline, and scope document. No hidden costs, no vague deliverables.' },
  { number: '03', label: 'Build', heading: 'We get to work', desc: 'Frontend and backend built in parallel. You get progress updates throughout — not radio silence.' },
  { number: '04', label: 'Review', heading: 'Your feedback', desc: 'You review the work. We revise until it is exactly right. No rush, no extra charge for reasonable changes.' },
  { number: '05', label: 'Launch', heading: 'Go live', desc: 'We deploy, hand over everything you need, and walk you through the site. Support period starts here.' },
]

export default function HowWeWork() {
  return (
    <section className="process" id="process">
      <AnimatedSection variant="fadeUp">
        <div className="process__header">
          <div className="section-tag">How it works</div>
          <h2 className="section-title">From first call<br />to live site.</h2>
          <p className="section-sub">
            Five clear steps. No guesswork, no scope creep, no nasty surprises on launch day.
          </p>
        </div>
      </AnimatedSection>

      <div className="process__steps">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="process__step"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="process__step-top">
              <div className="process__step-dot" />
              <span className="process__step-num">{step.number} / {step.label.toUpperCase()}</span>
            </div>
            <h3 className="process__step-heading">{step.heading}</h3>
            <p className="process__step-desc">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}