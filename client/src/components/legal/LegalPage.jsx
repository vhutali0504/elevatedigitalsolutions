import { usePageMeta } from '../../hooks/usePageMeta'

const UPDATED = '4 November 2026'

export default function LegalPage({ title, description, path, children, showDate = true }) {
  usePageMeta({ title: `${title} | Elevate Digital Solutions`, description, path })
  return (
    <article className="legal">
      <h1 className="head">{title}</h1>
      {showDate && <p className="legal__date">Last updated {UPDATED}</p>}
      <div className="legal__body">{children}</div>
    </article>
  )
}
