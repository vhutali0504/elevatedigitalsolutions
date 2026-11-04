import Reveal, { Line } from '../Reveal'
import { FAQS } from '../../data/faq'

export default function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <Reveal>
        <h2 id="faq-title" className="lines faq__title"><Line>Before you ask</Line></h2>
      </Reveal>
      <div className="faq__body">
        <Reveal as="figure" className="faq__pic">
          <div className="shutter">
            <img
              src="/images/tech-laptop.webp"
              width="1000"
              height="724"
              loading="lazy"
              decoding="async"
              alt="Hands typing on a laptop with code on its screen, on a bright wooden desk."
            />
          </div>
          <figcaption>Photo: Crew, CC0.</figcaption>
        </Reveal>
        <div className="faq__list">
          {FAQS.map(([q, a]) => (
            <details key={q} className="faq__item">
              <summary>
                <span>{q}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7.500 10 13.500 16 7.500" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
