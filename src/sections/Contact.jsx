import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import AnimatedSection from '../components/AnimatedSection'
import '../styles/Contact.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const services = [
  'Landing page',
  'Business website',
  'E-commerce store',
  'Care plan only',
  'Not sure yet',
]

const getServiceFromURL = () => {
  const hash = window.location.hash
  const queryStart = hash.indexOf('?')
  if (queryStart === -1) return ''
  const params = new URLSearchParams(hash.slice(queryStart))
  return params.get('service') || ''
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', business: '', email: '', phone: '', service: getServiceFromURL(), message: '',
  })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const handleHashChange = () => {
      const service = getServiceFromURL()
      if (service) setFormData(prev => ({ ...prev, service }))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: formData.name,
        business: formData.business,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      }, EMAILJS_PUBLIC_KEY)
      setStatus('success')
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <AnimatedSection variant="slideLeft">
          <div className="contact__info">
            <div className="section-tag">Get in touch</div>
            <h2 className="section-title">Let's build<br />something.</h2>
            <p className="section-sub">
              Tell us about your business and what you need. We'll get back
              to you within 24 hours with a proper response, not a bot reply.
            </p>
            <div className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-label">Location</span>
                <span className="contact__detail-val">Johannesburg, South Africa</span>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-label">WhatsApp</span>
                <a href="https://wa.me/27648457070" className="contact__detail-val contact__detail-val--link" target="_blank" rel="noreferrer">
                  +27 64 845 7070
                </a>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-label">Email</span>
                <a href="mailto:hello@elevate-digitalsolutions.co.za" className="contact__detail-val contact__detail-val--link">
                  hello@elevate-digitalsolutions.co.za
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="slideRight" delay={0.1}>
          <div className="contact__form-wrap">
            {status === 'success' ? (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="contact__success-icon">✓</div>
                <h3>Message sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="name">Your name</label>
                    <input id="name" name="name" type="text" placeholder="John Dlamini" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="business">Business name</label>
                    <input id="business" name="business" type="text" placeholder="Dlamini & Sons" value={formData.business} onChange={handleChange} />
                  </div>
                </div>
                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="email">Email address</label>
                    <input id="email" name="email" type="email" placeholder="john@example.co.za" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input id="phone" name="phone" type="tel" placeholder="+27 82 000 0000" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="service">What do you need?</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange}>
                    <option value="" disabled>Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Tell us about your business</label>
                  <textarea id="message" name="message" placeholder="What does your business do? What do you need the site to achieve?" value={formData.message} onChange={handleChange} rows={5} />
                </div>
                {status === 'error' && (
                  <p className="contact__error">
                    Something went wrong. Please try again or send us a WhatsApp directly.
                  </p>
                )}
                <motion.button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </motion.button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}