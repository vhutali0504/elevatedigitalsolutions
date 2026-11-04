import { Link } from 'react-router-dom'
import LegalPage from '../components/legal/LegalPage'
import { SITE } from '../data/site'

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" path="/privacy" description="What personal information Elevate Digital Solutions collects, why, and how to have it corrected or deleted under POPIA.">
      <p>{SITE.name} is a freelance web development partnership based in Johannesburg. This policy explains how we handle personal information under South Africa's Protection of Personal Information Act (POPIA).</p>

      <h2>What we collect</h2>
      <p>Only what you type into our contact form: your name, email address, what you need and your message. Your business name and phone number are optional. We also receive whatever you choose to send us by email or WhatsApp.</p>
      <p>The name you type into the quote builder stays in your browser. It is only sent to us if you choose to send us the quote.</p>

      <h2>Why we use it</h2>
      <p>To reply to your enquiry, prepare a quote, and carry out any work you ask us to do. We use it on the basis of your consent and, once we work together, to perform our agreement with you. We don't send marketing, and we don't sell your information.</p>

      <h2>Who else handles it</h2>
      <ul>
        <li><strong>EmailJS</strong> delivers contact form messages to our inbox.</li>
        <li><strong>Netlify</strong> hosts this website and may keep standard server logs, such as IP addresses.</li>
        <li><strong>WhatsApp</strong> handles your message if you choose to contact us there, under its own privacy terms.</li>
      </ul>
      <p>Some of these providers process data outside South Africa. We only share what is needed for them to do these jobs.</p>

      <h2>How long we keep it</h2>
      <p>We keep enquiries that don't become projects for up to 12 months. For clients, we keep project and payment records for as long as the law requires, generally five years.</p>

      <h2>Your rights</h2>
      <p>You can ask us what we hold about you, and ask us to correct or delete it, at any time. Email <a className="link" href={`mailto:${SITE.email}?subject=Data%20request`}>{SITE.email}</a> with the subject "Data request" and we'll respond within 30 days. You can withdraw your consent the same way.</p>
      <p>If you're unhappy with how we've handled your information, you may complain to the Information Regulator of South Africa at <a className="link" href="https://inforegulator.org.za" target="_blank" rel="noreferrer">inforegulator.org.za</a>.</p>

      <h2>Children</h2>
      <p>Our services are for businesses and adults. We don't knowingly collect information from anyone under 18. If you think a child has contacted us, tell us and we'll delete it.</p>

      <h2>Cookies</h2>
      <p>We don't use tracking cookies. See the <Link className="link" to="/cookies">cookie policy</Link>.</p>
    </LegalPage>
  )
}
