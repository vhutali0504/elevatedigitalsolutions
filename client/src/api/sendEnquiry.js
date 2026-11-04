const TIMEOUT_MS = 12000
const COOLDOWN_MS = 60000
const KEY = 'eds-last-enquiry'

export class EnquiryError extends Error {
  constructor(code) {
    super(code)
    this.code = code
  }
}

const lastSent = () => {
  try {
    return Number(localStorage.getItem(KEY)) || 0
  } catch {
    return 0
  }
}

// EmailJS also enforces limits on its side. This stops accidental double submissions.
export async function sendEnquiry(fields) {
  if (Date.now() - lastSent() < COOLDOWN_MS) throw new EnquiryError('cooldown')

  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (!service || !template || !publicKey) throw new EnquiryError('not-configured')

  const { default: emailjs } = await import('@emailjs/browser')
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new EnquiryError('timeout')), TIMEOUT_MS)
  })
  try {
    await Promise.race([emailjs.send(service, template, fields, publicKey), timeout])
  } finally {
    clearTimeout(timer)
  }

  try {
    localStorage.setItem(KEY, String(Date.now()))
  } catch {
    // Storage blocked. The form still works, without the cooldown.
  }
}
