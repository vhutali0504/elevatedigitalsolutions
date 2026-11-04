export const SITE = {
  name: 'Elevate Digital Solutions',
  email: 'hello@elevate-digitalsolutions.co.za',
  whatsapp: '27648457070',
  whatsappDisplay: '+27 64 845 7070',
  city: 'Johannesburg, South Africa',
  url: 'https://elevate-digitalsolutions.co.za',
}

export const whatsappLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
