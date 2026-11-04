import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const slug = (name) =>
  (name || 'yourbusiness').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24) || 'yourbusiness'

// Every block of the little site enters by opening downwards, so the page visibly grows.
function Block({ id, className = '', children }) {
  return (
    <motion.div
      key={id}
      layout="position"
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.16 } }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function DrawnMap({ accent }) {
  return (
    <svg className="ms-map__svg" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="120" fill="#E4E9E4" />
      <path d="M-10 86 L120 62 L210 78 L340 40" stroke="#fff" strokeWidth="9" fill="none" />
      <path d="M70 -10 L104 130 M210 -10 L188 130" stroke="#fff" strokeWidth="6" fill="none" />
      <path d="M250 70 q24 -8 44 16 q-12 28 -44 18 z" fill="#C5D9C2" />
      <circle cx="150" cy="60" r="9" fill={accent} />
      <circle cx="150" cy="60" r="3.500" fill="#fff" />
    </svg>
  )
}

/**
 * A real, small, responsive website. It reflows with container queries, so the phone
 * preview is the same markup as the desktop one, not a second drawing.
 * `step` plays a visitor action: 1 = a slot booked, an item added, or a chat opened.
 */
export default function MiniSite({ sample, name, blocks, step = 0, caret = false, phone = false }) {
  const has = (b) => blocks.includes(b)
  const shownName = name || 'Your Business'
  const { accent } = sample

  return (
    <div className={`ms-browser ${phone ? 'ms-browser--phone' : ''}`} data-ui>
      <div className="ms-bar">
        <span className="ms-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="ms-url">{slug(name)}.co.za</span>
      </div>

      <div className="ms-viewport">
        <div className="ms" style={{ '--ms-accent': accent }}>
          <div className="ms-nav">
            <span className="ms-logo">{shownName}{caret && <i className="ms-caret" aria-hidden="true" />}</span>
            <span className="ms-links">
              {has('pages') ? (
                <>
                  <span>Services</span><span>About</span><span>Gallery</span><span>Contact</span>
                </>
              ) : !has('cart') ? (
                <span>Contact</span>
              ) : (
                <span>Shop</span>
              )}
              {has('account') && <span>Account</span>}
              {has('cart') && (
                <span className="ms-cart">
                  Cart
                  <motion.b key={step} initial={{ scale: step ? 1.7 : 1 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: EASE }}>
                    {step ? 1 : 0}
                  </motion.b>
                </span>
              )}
            </span>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {has('promo') && <Block id="promo" key="promo" className="ms-promo">{sample.promo}</Block>}

            <Block id="hero" key={`hero-${sample.name}`} className="ms-hero">
              <div className="ms-hero__text">
                <p className="ms-h1">{sample.headline}</p>
                <p className="ms-p">{sample.tagline}</p>
                <span className="ms-btn">{sample.cta}</span>
              </div>
              <div className="ms-hero__pic">
                <img className={has('motion') ? 'ms-drift' : ''} src={sample.image} alt="" width="900" height="600" />
              </div>
            </Block>

            {has('services') && sample.services && (
              <Block id="services" key="services" className="ms-tiles">
                {sample.services.map((s) => <span className="ms-tile" key={s}>{s}</span>)}
              </Block>
            )}

            {has('booking') && sample.slots && (
              <Block id="booking" key="booking" className="ms-section">
                <p className="ms-h2">Book for Friday</p>
                <div className="ms-slots">
                  {sample.slots.map((t, i) => (
                    <span key={t} className={`ms-slot ${step && i === 2 ? 'is-on' : ''}`}>{t}</span>
                  ))}
                </div>
                <AnimatePresence>
                  {step > 0 && (
                    <motion.p
                      className="ms-note"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      Booked. You will get a WhatsApp reminder.
                    </motion.p>
                  )}
                </AnimatePresence>
              </Block>
            )}

            {has('products') && sample.products && (
              <Block id="products" key="products" className="ms-products">
                {sample.products.map((p, i) => (
                  <span className="ms-product" key={p.name}>
                    <span className="ms-product__pic" style={{ backgroundImage: `url(${sample.image})`, backgroundPosition: `${i * 33}% 50%` }} />
                    <span className="ms-product__row"><span>{p.name}</span><b>{p.price}</b></span>
                    <span className={`ms-add ${step && i === 0 ? 'is-on' : ''}`}>{step && i === 0 ? 'Added' : 'Add'}</span>
                  </span>
                ))}
              </Block>
            )}

            {has('payments') && (
              <Block id="payments" key="payments" className="ms-pay">
                <span>Secure checkout with</span><b>PayFast</b><b>Yoco</b>
              </Block>
            )}

            {has('dashboard') && (
              <Block id="dashboard" key="dashboard" className="ms-dash">
                <p className="ms-h2">Today's bookings</p>
                <div className="ms-dash__row"><span>Sipho M.</span><span>Fade</span><b>Confirmed</b></div>
                <div className="ms-dash__row"><span>Ayanda K.</span><span>Beard</span><b>Paid</b></div>
                <div className="ms-dash__row"><span>Naledi T.</span><span>Kids</span><b>New</b></div>
                <p className="ms-note">Signed in as manager. Staff see their own diary only.</p>
              </Block>
            )}

            {has('analytics') && (
              <Block id="analytics" key="analytics" className="ms-stats">
                <span><b>{has('products') ? '38' : '412'}</b>{has('products') ? ' orders this week' : ' visits this week'}</span>
                <span className="ms-bars" aria-hidden="true">
                  {[38, 54, 46, 70, 62, 88, 76].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
                </span>
              </Block>
            )}

            {has('map') && (
              <Block id="map" key="map" className="ms-map">
                <DrawnMap accent={accent} />
              </Block>
            )}

            {has('contact') && (
              <Block id="contact" key="contact" className="ms-section">
                <p className="ms-h2">Get in touch</p>
                <div className="ms-form"><span>Your name</span><span>Your number</span><span className="ms-btn">Send</span></div>
              </Block>
            )}
          </AnimatePresence>
        </div>

        {has('whatsapp') && (
          <span className="ms-wa">
            <AnimatePresence>
              {step > 0 && !has('booking') && !has('cart') && (
                <motion.span
                  className="ms-wa__chat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  Hi, can you come out today?
                </motion.span>
              )}
            </AnimatePresence>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 3a9 9 0 0 0-7.700 13.700L3 21l4.400-1.200A9 9 0 1 0 12 3Zm4.700 12.500c-.2.600-1.100 1.100-1.600 1.100-.4.100-1 .1-1.600-.1-3-1-4.800-3.900-5-4.100-.1-.2-1.100-1.500-1.100-2.800s.7-2 .9-2.200c.3-.3.600-.3.800-.3h.5c.2 0 .4 0 .6.500l.8 1.900c.1.200.1.300 0 .5l-.6.800c-.1.100-.3.300-.1.600.7 1.200 1.700 1.900 2.700 2.400.3.100.5.100.6-.1l.8-1c.2-.2.400-.2.600-.1l1.800.9c.3.100.4.200.5.300.1.200.1.800-.2 1.500Z" /></svg>
          </span>
        )}
      </div>
    </div>
  )
}
