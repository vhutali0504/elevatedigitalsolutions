import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal, { Line } from '../Reveal'

export default function TechBand() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The two pictures drift at different speeds inside their frames, which gives the band depth.
  const codeY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-7%', '7%'])
  const fibreY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['9%', '-9%'])

  return (
    <section className="tech" ref={ref} aria-labelledby="tech-title">
      <Reveal as="figure" className="tech__code">
        <div className="shutter tech__frame">
          <motion.img
            src="/images/tech-code.webp"
            width="1024"
            height="683"
            loading="lazy"
            decoding="async"
            alt="A close-up of colourful source code on a dark screen, running diagonally across the frame."
            style={{ y: codeY }}
          />
        </div>
      </Reveal>

      <div className="tech__side">
        <Reveal className="tech__copy">
          <h2 id="tech-title" className="lines head"><Line>Built properly,</Line><Line i={1}>underneath.</Line></h2>
          <p className="rise" style={{ '--i': 2 }}>What your customers see is only part of the job. Underneath is the code that loads quickly on a phone, takes payments through PayFast or Yoco, and shows up when someone searches for you.</p>
        </Reveal>
        <Reveal as="figure" className="tech__fibre">
          <div className="shutter tech__frame">
            <motion.img
              src="/images/tech-fibre.webp"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
              alt="Fibre optic strands glowing blue and white, fanning out from a bright point."
              style={{ y: fibreY }}
            />
          </div>
          <figcaption>Photos: Markus Spiske and chaitawat, CC0.</figcaption>
        </Reveal>
      </div>
    </section>
  )
}
