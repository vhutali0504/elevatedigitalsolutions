import { Link } from 'react-router-dom'
import LegalPage from '../components/legal/LegalPage'
import { SITE } from '../data/site'

export default function Terms() {
  return (
    <LegalPage title="Terms of service" path="/terms" description="The terms that apply when you use this site or hire Elevate Digital Solutions to build a website.">
      <p>These terms apply when you use this site or hire {SITE.name} ("we"), a freelance web development partnership based in Johannesburg. We are not a registered company.</p>

      <h2>Quotes</h2>
      <p>Prices on this site and in the quote builder are estimates in South African rand. Prices marked "from" depend on your scope. Your project's price, timeline and deliverables are confirmed in a written quote and scope document, and that document applies over anything on this site.</p>

      <h2>Payment</h2>
      <p>We require a 50% deposit before starting and the remaining 50% on delivery. We accept EFT and cash. See the <Link className="link" to="/refunds">refund policy</Link> for what happens if a project is cancelled.</p>

      <h2>Your part</h2>
      <p>Timelines depend on you providing content and feedback on time. You confirm that you have the right to use anything you give us, such as logos, photos and text.</p>

      <h2>Changes</h2>
      <p>Reasonable revisions within the agreed scope are included. Work outside the scope is quoted separately before we do it.</p>

      <h2>Ownership</h2>
      <p>Once the project is paid in full you own the code, the design and the domain. Until then, they remain ours. Open-source software and third-party services keep their own licences.</p>

      <h2>Support and the care plan</h2>
      <p>Your package's support period starts at launch. The optional care plan costs R500 a month, runs month to month, and covers hosting with uptime monitoring, backups and security checks, monthly content and feature updates, and priority support.</p>

      <h2>Limits</h2>
      <p>We build carefully, but no website can be guaranteed to be free of every fault or to produce a particular business result. Nothing in these terms limits rights you have under the Consumer Protection Act or other law that cannot be excluded.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the law of South Africa. Questions? Email <a className="link" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </LegalPage>
  )
}
