import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import '../styles/FAQ.css'

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Landing pages take 5–7 days. Business websites take 2–3 weeks. E-commerce stores take 3–5 weeks. Timelines depend on how quickly you provide content and feedback.',
  },
  {
    question: 'Do I own the website once it\'s done?',
    answer: 'Yes. Once the project is paid in full you own everything — the code, the design, the domain. We don\'t hold anything hostage.',
  },
  {
    question: 'What do you need from me to get started?',
    answer: 'A brief about your business, your logo if you have one, any photos you want used, and a 50% deposit to kick things off.',
  },
  {
    question: 'Can you help with content and photos?',
    answer: 'We can help structure and write basic content. For professional photography we recommend hiring a local photographer, but we can work with whatever you provide.',
  },
  {
    question: 'What happens after the site goes live?',
    answer: 'We hand over everything, walk you through the site, and your support period begins. After that our R500/month care plan keeps everything running smoothly.',
  },
  {
    question: 'Do you work with businesses outside Johannesburg?',
    answer: 'Yes. We work remotely with businesses anywhere in South Africa. Everything is handled online — calls, feedback, and delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'EFT and cash. We require a 50% deposit before starting and the remaining 50% on delivery.',
  },
  {
    question: 'Can I update the website myself after it\'s built?',
    answer: 'Depends on the package. We can add a simple CMS on request. Otherwise updates are handled through our care plan.',
  },
  {
    question: 'What if I already have a website but want it redesigned?',
    answer: 'We do redesigns. We\'ll assess your current site, discuss what\'s not working, and quote you accordingly.',
  },
  {
    question: 'Why should I choose EDS over a freelancer?',
    answer: 'You get three specialists — backend, frontend, and project management — for the price of one. No single point of failure, faster delivery, and someone always available to respond.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faq" id="faq">
      <AnimatedSection variant="fadeUp">
        <div className="section-tag">Got questions</div>
        <h2 className="section-title">We've got answers.</h2>
        <p className="section-sub">
          Everything you need to know before getting started. Can't find what you're looking for? Send us a WhatsApp.
        </p>
      </AnimatedSection>

      <div className="faq__list">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <button className="faq__question" onClick={() => toggle(i)}>
              <span>{faq.question}</span>
              <motion.div
                className="faq__icon"
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  className="faq__answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}