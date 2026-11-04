import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CityBand() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.14, 1])

  return (
    <figure className="city" ref={ref}>
      <motion.img
        src="/images/joburg-skyline.webp"
        width="1920"
        height="690"
        alt="The Johannesburg skyline at dusk, with the Hillbrow Tower and Ponte City lit up."
        loading="lazy"
        decoding="async"
        style={{ scale }}
      />
      <figcaption>Johannesburg at dusk. Photo: Chris7cn, CC BY-SA 3.0. <Link className="link" to="/credits">Credits</Link></figcaption>
    </figure>
  )
}
