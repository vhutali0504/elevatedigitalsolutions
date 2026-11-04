import LegalPage from '../components/legal/LegalPage'
import credits from '../credits.json'

export default function Credits() {
  return (
    <LegalPage title="Picture credits" path="/credits" showDate={false} description="Credits and licences for the photographs and typeface used on this site.">
      <p>The photographs show Johannesburg, show technology in general, or stand in for the made-up businesses in our demos. None of them show our team, our clients or our own equipment. Photos were cropped and compressed for the web.</p>
      <ul>
        {credits.map((c) => (
          <li key={c.page}>
            <a className="link" href={c.page} target="_blank" rel="noreferrer">{c.title}</a>
            {c.creator ? ` by ${c.creator}` : ''}, via {c.via}.{' '}
            <a className="link" href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a>
          </li>
        ))}
      </ul>
      <h2>Typeface</h2>
      <p>Cabinet Grotesk by Indian Type Foundry, from Fontshare, under the ITF Free Font License. The logo lettering is drawn from Outfit, under the SIL Open Font License.</p>
    </LegalPage>
  )
}
