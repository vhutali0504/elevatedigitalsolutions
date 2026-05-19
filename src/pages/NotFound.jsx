import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  const goToContact = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <div className="notfound">
      <div className="notfound__bg" />
      <div className="notfound__grid" />

      <motion.div
        className="notfound__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="notfound__code"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          404
        </motion.div>

        <div className="notfound__divider" />

        <h1 className="notfound__title">Page not found</h1>
        <p className="notfound__sub">
          Looks like this page doesn't exist or was moved. Let's get you back on track.
        </p>

        <div className="notfound__actions">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <button className="btn-ghost" onClick={goToContact}>
            Contact us
          </button>
        </div>

        <div className="notfound__brand">
          ELEVATE <span>DIGITAL SOLUTIONS</span>
        </div>
      </motion.div>
    </div>
  )
}