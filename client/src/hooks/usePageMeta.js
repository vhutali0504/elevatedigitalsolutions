import { useEffect } from 'react'

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Per-route title, description and canonical. Optionally keeps a route out of search.
export function usePageMeta({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', `https://elevate-digitalsolutions.co.za${path}`)
    let robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.append(robots)
      }
      robots.setAttribute('content', 'noindex')
    } else if (robots) {
      robots.remove()
    }
  }, [title, description, path, noindex])
}
