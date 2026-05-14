import { useState } from 'react'
import '../styles/Contact.css'

const services = [
  'Landing page',
  'Business website',
  'E-commerce store',
  'Care plan only',
  'Not sure yet',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to EmailJS or your backend endpoint
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">

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
              <a
                href="https://wa.me/27648457070"
                className="contact__detail-val contact__detail-val--link"
                target="_blank"
                rel="noreferrer"
              >
                +27 64 845 7070
              </a>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Email</span>
              <a
                href="mailto:hello@elevatedigital.co.za"
                className="contact__detail-val contact__detail-val--link"
              >
                hello@elevatedigital.co.za
              </a>
            </div>
          </div>
        </div>

        <div className="contact__form-wrap">
          {submitted ? (
            <div className="contact__success">
              <div className="contact__success-icon">✓</div>
              <h3>Message sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Dlamini"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="business">Business name</label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    placeholder="Dlamini & Sons"
                    value={formData.business}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.co.za"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+27 82 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="service">What do you need?</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a service</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="message">Tell us about your business</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What does your business do? What do you need the site to achieve?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <button type="submit" className="btn-primary contact__submit">
                Send message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}