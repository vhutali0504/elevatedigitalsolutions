import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import '../styles/Services.css'

const packages = {
  landing: {
    label: 'Landing Pages',
    cards: [
      {
        name: 'Basic',
        price: 'R2,500',
        desc: 'A clean single page to get you online fast.',
        features: ['1 page design', 'Mobile responsive', 'Contact form', 'WhatsApp button', 'Free domain setup'],
      },
      {
        name: 'Standard',
        price: 'R4,500',
        desc: 'Everything in Basic, plus more visibility tools.',
        featured: true,
        features: ['Basic SEO setup', 'Google Maps embed', 'Promo / offer section', '1 month support'],
      },
      {
        name: 'Premium',
        price: 'R7,000',
        desc: 'The full package — speed, polish, analytics.',
        features: ['Custom animations', 'Speed optimised', 'Analytics setup', '2 months support'],
      },
    ],
  },
  business: {
    label: 'Business Websites',
    cards: [
      {
        name: 'Starter',
        price: 'R7,500',
        desc: 'Multi-page site for small to medium businesses.',
        features: ['5–7 page website', 'Mobile-friendly design', 'WhatsApp integration', 'Basic SEO + Maps', 'Basic logo if needed', '1 month support'],
      },
      {
        name: 'Professional',
        price: 'R12,000',
        desc: 'Built for businesses ready to grow online.',
        featured: true,
        features: ['Booking system', 'Advanced design', 'Speed optimisation', '2 months support'],
      },
      {
        name: 'Custom',
        price: 'R18,000+',
        desc: 'Portals, dashboards, multi-user systems.',
        features: ['Dashboard / portal', 'Multi-user roles', 'API integrations', '3 months support'],
      },
    ],
  },
  ecommerce: {
    label: 'E-commerce',
    cards: [
      {
        name: 'Store',
        price: 'R18,000',
        desc: 'A complete online store for the SA market.',
        featured: true,
        features: ['PayFast / Yoco payments', 'Up to 50 products', 'Order management', 'Mobile responsive', '2 months support'],
      },
      {
        name: 'Advanced Store',
        price: 'R28,000+',
        desc: 'Full-featured e-commerce with analytics.',
        features: ['Inventory management', 'Discount & promo engine', 'Customer accounts', 'Sales analytics', '3 months support'],
      },
    ],
  },
  care: {
    label: 'Care Plan',
    cards: [
      {
        name: 'Website Care Plan',
        price: 'R500/mo',
        desc: 'Peace of mind. We handle the technical side so you can focus on your business.',
        featured: true,
        features: ['Reliable hosting with uptime monitoring', 'Regular backups and security checks', 'Monthly content and feature updates', 'Priority support — fast response on any issues'],
      },
    ],
  },
}

// Maps each tab to the matching contact form dropdown value
const serviceMap = {
  landing: 'Landing page',
  business: 'Business website',
  ecommerce: 'E-commerce store',
  care: 'Care plan only',
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('landing')
  const { cards } = packages[activeTab]
  const serviceValue = serviceMap[activeTab]

  return (
    <section className="services" id="services">
      <AnimatedSection variant="fadeUp">
        <div className="section-tag">What we build</div>
        <h2 className="section-title">Service Packages</h2>
        <p className="section-sub">
          Straightforward pricing, no surprises. Every project comes with
          mobile responsiveness and a real human you can call.
        </p>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" delay={0.1}>
        <div className="services__tabs">
          {Object.entries(packages).map(([key, { label }]) => (
            <button
              key={key}
              className={`services__tab ${activeTab === key ? 'services__tab--active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      <div className="services__grid">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            className={`pkg-card ${card.featured ? 'pkg-card--featured' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            {card.featured && <div className="pkg-card__badge">Most Popular</div>}
            <div className="pkg-card__name">{card.name}</div>
            <div className="pkg-card__price">{card.price}</div>
            <p className="pkg-card__desc">{card.desc}</p>
            <ul className="pkg-card__features">
              {card.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <a
              href={`#contact?service=${encodeURIComponent(serviceValue)}`}
              className="btn-primary pkg-card__cta"
              onClick={() => {
                // small delay so scroll happens after URL update
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
            >
              Get started
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}