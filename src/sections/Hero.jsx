import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import '../styles/Hero.css'

const storySteps = [
  { label: '01', text: 'Your competitors are online.' },
  { label: '02', text: 'Every day without a website is a client lost.' },
  { label: '03', text: 'We fix that.' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const [activeStory, setActiveStory] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const edsY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const edsScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const edsOpacity = useTransform(scrollYProgress, [0, 0.6], [0.12, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40])

  const springEdsY = useSpring(edsY, { stiffness: 60, damping: 20 })
  const springContentY = useSpring(contentY, { stiffness: 60, damping: 20 })

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Story cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % storySteps.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Globe canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame
    let angle = 0
    let lastTime = 0
    const FPS = 30
    const INTERVAL = 1000 / FPS

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize)

    const draw = (timestamp) => {
      animFrame = requestAnimationFrame(draw)

      const delta = timestamp - lastTime
      if (delta < INTERVAL) return
      lastTime = timestamp - (delta % INTERVAL)

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const r = Math.min(w, h) * 0.38

      // simplified glow — no gradient every frame
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(27,79,216,0.06)'
      ctx.fill()

      // outer circle
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(27,79,216,0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // latitude lines
      for (let i = 1; i < 5; i++) {
        const latY = cy - r + (r * 2 * i) / 5
        const latR = Math.sqrt(Math.max(0, r * r - Math.pow(latY - cy, 2)))
        ctx.beginPath()
        ctx.ellipse(cx, latY, latR, latR * 0.2, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(27,79,216,0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // longitude lines
      for (let i = 0; i < 4; i++) {
        const a = angle + (Math.PI * i) / 4
        ctx.beginPath()
        ctx.ellipse(cx, cy, r * Math.abs(Math.cos(a)), r, Math.PI / 2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(27,79,216,${0.12 + 0.15 * Math.abs(Math.cos(a))})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // dots — no per-dot gradients, just solid circles with glow via shadow
      ctx.shadowColor = 'rgba(27,79,216,0.8)'
      ctx.shadowBlur = 8
      for (let i = 0; i < 8; i++) {
        const dotAngle = angle * 0.5 + (Math.PI * 2 * i) / 8
        const dotLat = Math.sin(angle * 0.3 + i) * 0.6
        const dotX = cx + r * 0.85 * Math.cos(dotAngle) * Math.cos(dotLat)
        const dotY = cy + r * 0.85 * (Math.sin(dotLat) * 0.5 + Math.sin(dotAngle) * Math.cos(dotLat) * 0.15)
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      angle += 0.004
    }

    animFrame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animFrame)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>

      {/* Parallax grid */}
      <motion.div className="hero__grid" style={{ y: gridY }} />

      {/* 3D EDS letters */}
      <motion.div
        className="hero__eds"
        style={{
          y: springEdsY,
          scale: edsScale,
          opacity: edsOpacity,
          rotateX: mousePos.y * 0.3,
          rotateY: mousePos.x * 0.3,
        }}
      >
        EDS
      </motion.div>

      {/* Blue glow behind EDS */}
      <motion.div
        className="hero__glow"
        style={{ y: springEdsY, opacity: edsOpacity }}
      />



      {/* Main content */}
      <motion.div
        className="hero__content"
        style={{ y: springContentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__tag" variants={itemVariants}>
          Johannesburg, South Africa
        </motion.div>

        <motion.h1 className="hero__heading" variants={itemVariants}>
          Your next client<br />
          will Google you<br />
          <span className="hero__accent">first.</span>
        </motion.h1>

        <motion.p className="hero__sub" variants={itemVariants}>
          We build professional websites, booking systems, and online stores
          for South African businesses. Fast, clean, and built to convert.
        </motion.p>

        <motion.div className="hero__actions" variants={itemVariants}>
          <a href="#services" className="btn-primary">View packages</a>
          <a href="#contact" className="btn-ghost">Get in touch</a>
        </motion.div>

        <motion.div className="hero__stats" variants={itemVariants}>
          <div className="hero__stat">
            <span className="hero__stat-num">R2,500</span>
            <span className="hero__stat-label">Starting price</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">14</span>
            <span className="hero__stat-label">Day avg. turnaround</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">100%</span>
            <span className="hero__stat-label">Mobile responsive</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right visual */}
      <motion.div
        className="hero__visual"
        style={{ y: visualY }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Story ticker — sits above terminal */}
        <div className="hero__story">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              className="hero__story-text"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <span className="hero__story-num">{storySteps[activeStory].label}</span>
              {storySteps[activeStory].text}
            </motion.div>
          </AnimatePresence>
          <div className="hero__story-dots">
            {storySteps.map((_, i) => (
              <button
                key={i}
                className={`hero__story-dot ${i === activeStory ? 'hero__story-dot--active' : ''}`}
                onClick={() => setActiveStory(i)}
              />
            ))}
          </div>
        </div>

        <canvas ref={canvasRef} className="hero__globe" />
        <motion.div
          className="hero__laptop"
          style={{
            rotateX: mousePos.y * 0.1,
            rotateY: mousePos.x * -0.1,
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Laptop screen */}
          <div className="hero__laptop-screen">
            {/* Browser chrome */}
            <div className="hero__browser-bar">
              <div className="hero__browser-dots">
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#febc2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <div className="hero__browser-url">
                <span className="hero__browser-lock">🔒</span>
                <motion.span
                  className="hero__browser-domain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  google.com/search?q=elevate-digitalsolutions.co.za
                </motion.span>
              </div>
            </div>

            {/* Google search page */}
            <div className="hero__browser-page">

              {/* Google logo + search bar */}
              <motion.div
                className="hero__google-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="hero__google-logo">
                  <span style={{ color: '#4285F4' }}>G</span>
                  <span style={{ color: '#EA4335' }}>o</span>
                  <span style={{ color: '#FBBC05' }}>o</span>
                  <span style={{ color: '#4285F4' }}>g</span>
                  <span style={{ color: '#34A853' }}>l</span>
                  <span style={{ color: '#EA4335' }}>e</span>
                </div>
                <div className="hero__google-searchbar">
                  <span className="hero__google-query">elevate-digitalsolutions.co.za</span>
                  <span className="hero__google-searchicon">🔍</span>
                </div>
              </motion.div>

              {/* Search result */}
              <motion.div
                className="hero__google-result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="hero__result-source">
                  <div className="hero__result-favicon">E</div>
                  <div className="hero__result-domain-wrap">
                    <span className="hero__result-name">Elevate Digital Solutions</span>
                    <span className="hero__result-url">https://elevate-digitalsolutions.co.za</span>
                  </div>
                </div>
                <div className="hero__result-title">
                  Elevate Digital Solutions | Web Development Johannesburg
                </div>
                <div className="hero__result-desc">
                  Elevate Digital Solutions is a <strong>Johannesburg-based web development agency</strong> built for local businesses. Professional websites, booking systems &amp; online stores.
                </div>
              </motion.div>

              {/* Blinking cursor */}
              <motion.div
                className="hero__page-cursor"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Laptop base */}
          <div className="hero__laptop-base">
            <div className="hero__laptop-hinge" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="hero__scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span>scroll</span>
      </motion.div>

    </section>
  )
}