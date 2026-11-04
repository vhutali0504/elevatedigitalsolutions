import LegalPage from '../components/legal/LegalPage'
import { SITE } from '../data/site'

export default function Refunds() {
  return (
    <LegalPage title="Refund policy" path="/refunds" description="How deposits, cancellations and care plan payments work at Elevate Digital Solutions.">
      <p>Projects are paid as a 50% deposit before we start and 50% on delivery. There are no hidden fees: anything extra is agreed with you in writing first.</p>

      <h2>Cancelling before we start</h2>
      <p>If you cancel before any work has begun, we refund your deposit in full.</p>

      <h2>Cancelling once work has started</h2>
      <p>We keep the part of the deposit that covers work already done, based on the stages in your scope document, and refund the rest. If the work already done is worth more than your deposit, we'll agree the difference with you before invoicing it.</p>

      <h2>If we can't deliver</h2>
      <p>If we can't deliver what was agreed in your scope and can't put it right, we refund what you've paid for the undelivered work.</p>

      <h2>Care plan</h2>
      <p>The care plan runs month to month. Cancel any time by email or WhatsApp and it stops at the end of the month you've paid for. Months already started aren't refunded.</p>

      <h2>How to ask</h2>
      <p>Email <a className="link" href={`mailto:${SITE.email}?subject=Refund%20request`}>{SITE.email}</a>. We reply within 5 working days, and pay approved refunds by EFT. This policy doesn't limit your rights under the Consumer Protection Act.</p>
    </LegalPage>
  )
}
