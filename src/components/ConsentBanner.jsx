import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ConsentBanner.css'

const defaultPrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState(defaultPrefs)

  useEffect(() => {
    const accepted = localStorage.getItem('eds_consent')
    if (!accepted) setVisible(true)
  }, [])

  const save = (selectedPrefs) => {
    localStorage.setItem('eds_consent', 'true')
    localStorage.setItem('eds_prefs', JSON.stringify(selectedPrefs))
    setVisible(false)
  }

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true, functional: true })
  const necessaryOnly = () => save({ necessary: true, analytics: false, marketing: false, functional: false })
  const analyticsOnly = () => save({ necessary: true, analytics: true, marketing: false, functional: false })
  const savePrefs = () => save(prefs)

  const togglePref = (key) => {
    if (key === 'necessary') return
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cb"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="cb__box">

            <div className="cb__header">
              <span className="cb__icon">🍪</span>
              <div>
                <div className="cb__title">We use cookies</div>
                <div className="cb__sub">
                  We use cookies to improve your experience and comply with POPIA. Choose how you'd like us to use them.
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showPrefs && (
                <motion.div
                  className="cb__prefs"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {[
                    { key: 'necessary', label: 'Necessary', desc: 'Required for the site to function. Cannot be disabled.' },
                    { key: 'analytics', label: 'Analytics', desc: 'Helps us understand how visitors use the site.' },
                    { key: 'marketing', label: 'Marketing', desc: 'Used to deliver relevant ads and track campaigns.' },
                    { key: 'functional', label: 'Functional', desc: 'Enables enhanced features like live chat and videos.' },
                  ].map(item => (
                    <div key={item.key} className="cb__pref-row">
                      <div className="cb__pref-info">
                        <span className="cb__pref-label">{item.label}</span>
                        <span className="cb__pref-desc">{item.desc}</span>
                      </div>
                      <button
                        className={`cb__toggle ${prefs[item.key] ? 'cb__toggle--on' : ''} ${item.key === 'necessary' ? 'cb__toggle--disabled' : ''}`}
                        onClick={() => togglePref(item.key)}
                      >
                        <span className="cb__toggle-thumb" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cb__actions">
              {showPrefs ? (
                <>
                  <button className="cb__btn cb__btn--primary" onClick={savePrefs}>
                    Save preferences
                  </button>
                  <button className="cb__btn cb__btn--ghost" onClick={() => setShowPrefs(false)}>
                    Back
                  </button>
                </>
              ) : (
                <>
                  <button className="cb__btn cb__btn--primary" onClick={acceptAll}>
                    Accept all
                  </button>
                  <button className="cb__btn cb__btn--secondary" onClick={analyticsOnly}>
                    Analytics only
                  </button>
                  <button className="cb__btn cb__btn--ghost" onClick={necessaryOnly}>
                    Necessary only
                  </button>
                  <button className="cb__btn cb__btn--text" onClick={() => setShowPrefs(true)}>
                    Manage preferences
                  </button>
                </>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}