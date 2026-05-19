import { useEffect, useRef } from 'react'
import '../styles/ParticleBackground.css'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let animFrame
    let mouse = { x: null, y: null }
    let lastTime = 0
    const FPS = 30 // cap at 30fps — smooth enough, half the CPU
    const INTERVAL = 1000 / FPS

    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 30 : 60
    const CONNECTION_DISTANCE = isMobile ? 70 : 110
    const MOUSE_DISTANCE = isMobile ? 70 : 120

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200) // debounce resize
    }
    window.addEventListener('resize', onResize)

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onTouchMove = (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY }
    const onLeave = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }))

    const draw = (timestamp) => {
      animFrame = requestAnimationFrame(draw)

      // throttle to target FPS
      const delta = timestamp - lastTime
      if (delta < INTERVAL) return
      lastTime = timestamp - (delta % INTERVAL)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // batch all particle updates first
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        if (mouse.x !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_DISTANCE) {
            const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE
            p.x += dx * force * 0.02
            p.y += dy * force * 0.02
          }
        }
      }

      // draw connections in one pass
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(27,79,216,${(1 - dist / CONNECTION_DISTANCE) * 0.25})`
            ctx.stroke()
          }
        }

        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(27,79,216,${(1 - dist / MOUSE_DISTANCE) * 0.4})`
            ctx.stroke()
          }
        }
      }

      // draw dots last
      ctx.fillStyle = 'rgba(27,79,216,0.6)'
      for (let i = 0; i < particles.length; i++) {
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrame)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-bg" />
}