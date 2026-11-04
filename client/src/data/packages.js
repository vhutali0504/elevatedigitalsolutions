// Prices, features and timelines come from the previous site's Services and FAQ copy.
export const CATEGORIES = [
  {
    id: 'landing',
    label: 'Landing page',
    service: 'Landing page',
    time: '5 to 7 days',
    sample: 'plumbing',
    tiers: [
      { id: 'basic', name: 'Basic', price: 2500, desc: 'A clean single page to get you online fast.',
        features: ['1 page design', 'Mobile responsive', 'Contact form', 'WhatsApp button', 'Free domain setup'],
        support: 0, blocks: ['contact', 'whatsapp'] },
      { id: 'standard', name: 'Standard', price: 4500, desc: 'Everything in Basic, plus more visibility tools.',
        features: ['Basic SEO setup', 'Google Maps embed', 'Promo or offer section', '1 month support'],
        support: 1, blocks: ['contact', 'whatsapp', 'promo', 'map'] },
      { id: 'premium', name: 'Premium', price: 7000, desc: 'Everything in Standard, with speed, polish and analytics.',
        features: ['Custom animations', 'Speed optimised', 'Analytics setup', '2 months support'],
        support: 2, blocks: ['contact', 'whatsapp', 'promo', 'map', 'motion', 'analytics'] },
    ],
  },
  {
    id: 'business',
    label: 'Business website',
    service: 'Business website',
    time: '2 to 3 weeks',
    sample: 'barber',
    tiers: [
      { id: 'starter', name: 'Starter', price: 7500, desc: 'Multi-page site for small to medium businesses.',
        features: ['5 to 7 page website', 'Mobile-friendly design', 'WhatsApp integration', 'Basic SEO and Maps', 'Basic logo if needed', '1 month support'],
        support: 1, blocks: ['pages', 'services', 'contact', 'whatsapp', 'map'] },
      { id: 'professional', name: 'Professional', price: 12000, desc: 'Built for businesses ready to grow online.',
        features: ['Booking system', 'Advanced design', 'Speed optimisation', '2 months support'],
        support: 2, blocks: ['pages', 'services', 'booking', 'whatsapp', 'map', 'motion'] },
      { id: 'custom', name: 'Custom', price: 18000, from: true, desc: 'Portals, dashboards and multi-user systems.',
        features: ['Dashboard or portal', 'Multi-user roles', 'API integrations', '3 months support'],
        support: 3, time: 'Agreed in your scope', blocks: ['pages', 'dashboard', 'whatsapp'] },
    ],
  },
  {
    id: 'store',
    label: 'Online store',
    service: 'E-commerce store',
    time: '3 to 5 weeks',
    sample: 'bakery',
    tiers: [
      { id: 'store', name: 'Store', price: 18000, desc: 'A complete online store for the South African market.',
        features: ['PayFast or Yoco payments', 'Up to 50 products', 'Order management', 'Mobile responsive', '2 months support'],
        support: 2, blocks: ['cart', 'products', 'payments', 'whatsapp'] },
      { id: 'advanced', name: 'Advanced Store', price: 28000, from: true, desc: 'Full-featured e-commerce with analytics.',
        features: ['Inventory management', 'Discount and promo engine', 'Customer accounts', 'Sales analytics', '3 months support'],
        support: 3, time: 'Agreed in your scope', blocks: ['cart', 'account', 'promo', 'products', 'payments', 'analytics', 'whatsapp'] },
    ],
  },
]

export const CARE_PLAN = {
  price: 500,
  features: [
    'Reliable hosting with uptime monitoring',
    'Regular backups and security checks',
    'Monthly content and feature updates',
    'Priority support when something goes wrong',
  ],
}

export const SERVICE_OPTIONS = ['Landing page', 'Business website', 'E-commerce store', 'Care plan only', 'Not sure yet']

export const formatRand = (n) => `R${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
