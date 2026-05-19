import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/LoadingScreen.css'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // hide after 2 seconds
    const timer = setTimeout(() => setVisible(false), 2200)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="loader__bg" />
          <div className="loader__grid" />

          {/* EDS letters */}
          <motion.div
            className="loader__eds"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            EDS
          </motion.div>

          {/* Brand name */}
          <motion.div
            className="loader__brand"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="loader__brand-elevate">ELEVATE</span>
            <span className="loader__brand-divider" />
            <span className="loader__brand-ds">DIGITAL SOLUTIONS</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="loader__progress-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="loader__progress">
              <motion.div
                className="loader__progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="loader__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Building digital presence for SA businesses
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}