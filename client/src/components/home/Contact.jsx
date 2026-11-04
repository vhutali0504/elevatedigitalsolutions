import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EnquiryError, sendEnquiry } from '../../api/sendEnquiry'
import { SERVICE_OPTIONS } from '../../data/packages'
import { SITE, whatsappLink } from '../../data/site'
import Reveal, { Line } from '../Reveal'

const LIMITS = { name: 80, business: 100, email: 120, phone: 20, message: 2000 }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s()-]{6,19}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please tell us your name.'
  if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email, like you@example.co.za.'
  if (v.phone.trim() && !PHONE.test(v.phone.trim())) e.phone = 'Please enter a valid phone number, or leave this blank.'
  if (!v.service) e.service = 'Please choose what you need.'
  if (v.message.trim().length < 10) e.message = 'Please add a little more detail, at least 10 characters.'
  if (!v.consent) e.consent = 'We need your permission to use these details to reply.'
  return e
}

const FAILURES = {
  cooldown: 'We just received a message from you. Please wait a minute before sending another.',
  timeout: 'That took too long to send. Please try again, or message us on WhatsApp.',
  'not-configured': 'Our form is having a problem right now. Please email us or message us on WhatsApp.',
}

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}{optional && <span className="field__opt"> (optional)</span>}</label>
      {children}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}

export default function Contact({ prefill }) {
  const navigate = useNavigate()
  const summaryRef = useRef(null)
  const [values, setValues] = useState({ name: '', business: '', email: '', phone: '', service: '', message: '', consent: false, website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [failure, setFailure] = useState('')

  // A quote sent from the builder fills in the form.
  const [seen, setSeen] = useState(prefill)
  if (prefill !== seen) {
    setSeen(prefill)
    if (prefill) setValues((v) => ({ ...v, service: prefill.service, message: prefill.message }))
  }

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const a11y = (key) => ({ 'aria-invalid': errors[key] ? 'true' : undefined, 'aria-describedby': errors[key] ? `${key}-error` : undefined })

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (values.website) {
      navigate('/thanks')
      return
    }
    const found = validate(values)
    setErrors(found)
    setFailure('')
    if (Object.keys(found).length) {
      summaryRef.current?.focus()
      return
    }
    setStatus('sending')
    try {
      await sendEnquiry({
        name: values.name.trim(),
        business: values.business.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        service: values.service,
        message: values.message.trim(),
      })
      navigate('/thanks')
    } catch (err) {
      console.error('Enquiry failed', err instanceof EnquiryError ? err.code : err?.status)
      setFailure(FAILURES[err instanceof EnquiryError ? err.code : ''] ?? 'Something went wrong sending that. Please try again, or message us on WhatsApp.')
      setStatus('idle')
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__grid">
        <Reveal className="contact__say">
          <h2 className="lines" id="contact-title"><Line>Tell us what</Line><Line i={1}>you need.</Line></h2>
          <p className="contact__reply rise" style={{ '--i': 2 }}>We'll get back to you within 24 hours.</p>
          <ul className="contact__ways rise" style={{ '--i': 3 }}>
            <li><a className="link" href={whatsappLink('Hi EDS, I would like to talk about a website.')} target="_blank" rel="noreferrer">WhatsApp {SITE.whatsappDisplay}</a></li>
            <li>{SITE.city}</li>
          </ul>
        </Reveal>

        <form className="contact__form" onSubmit={submit} noValidate>
          <p ref={summaryRef} tabIndex={-1} className="contact__summary" role={errorCount ? 'alert' : undefined}>
            {errorCount > 0 && `Please fix ${errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`}.`}
          </p>
          <div className="contact__two">
            <Field id="name" label="Your name" error={errors.name}>
              <input id="name" autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={set('name')} {...a11y('name')} />
            </Field>
            <Field id="business" label="Business" optional>
              <input id="business" autoComplete="organization" maxLength={LIMITS.business} value={values.business} onChange={set('business')} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input id="email" type="email" autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={set('email')} {...a11y('email')} />
            </Field>
            <Field id="phone" label="Phone or WhatsApp" optional error={errors.phone}>
              <input id="phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone} value={values.phone} onChange={set('phone')} {...a11y('phone')} />
            </Field>
          </div>
          <Field id="service" label="What do you need?" error={errors.service}>
            <select id="service" value={values.service} onChange={set('service')} {...a11y('service')}>
              <option value="" disabled>Choose one</option>
              {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field id="message" label="Tell us about your business" error={errors.message}>
            <textarea id="message" rows={5} maxLength={LIMITS.message} value={values.message} onChange={set('message')} {...a11y('message')} />
          </Field>

          <div className="contact__trap" aria-hidden="true">
            <label htmlFor="website">Leave this empty</label>
            <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
          </div>

          <div className={`check ${errors.consent ? 'has-error' : ''}`}>
            <label>
              <input type="checkbox" checked={values.consent} onChange={set('consent')} {...a11y('consent')} />
              <span>I agree that Elevate Digital Solutions may use these details to reply to me, as set out in the <Link className="link" to="/privacy">privacy policy</Link>. I am 18 or older.</span>
            </label>
            {errors.consent && <p className="field__error" id="consent-error">{errors.consent}</p>}
          </div>

          {failure && <p className="contact__failure" role="alert">{failure}</p>}

          <button type="submit" className="btn btn--invert" disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>

      <Reveal>
        <a className="contact__email lines" href={`mailto:${SITE.email}`} aria-label={`Email us at ${SITE.email}`}>
          <span className="line"><span className="line__in" style={{ '--i': 0 }}>hello@</span></span>
          <span className="line"><span className="line__in" style={{ '--i': 1 }}>elevate-digitalsolutions.co.za</span></span>
        </a>
      </Reveal>
    </section>
  )
}
