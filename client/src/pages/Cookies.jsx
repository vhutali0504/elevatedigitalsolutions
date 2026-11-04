import LegalPage from '../components/legal/LegalPage'

export default function Cookies() {
  return (
    <LegalPage title="Cookie policy" path="/cookies" description="Elevate Digital Solutions uses no tracking or advertising cookies. Here is the small amount this site stores in your browser.">
      <p>This site doesn't use tracking cookies, advertising cookies or analytics. If that ever changes, we'll update this page and ask for your permission first.</p>

      <h2>What we store in your browser</h2>
      <p>Two small items, kept in your browser's local storage and never sent to us:</p>
      <ul>
        <li><strong>eds-cookie-notice</strong> remembers that you've dismissed the cookie note.</li>
        <li><strong>eds-last-enquiry</strong> records when you last sent the contact form, to prevent accidental duplicates.</li>
      </ul>

      <h2>Removing them</h2>
      <p>You can clear these at any time through your browser's site data settings. The site will still work.</p>

      <h2>Other sites</h2>
      <p>Links to WhatsApp, and to the sources in our picture credits, take you to other sites with their own cookie rules.</p>
    </LegalPage>
  )
}
