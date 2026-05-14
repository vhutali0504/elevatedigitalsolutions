import '../styles/About.css'

const values = [
  {
    icon: '🇿🇦',
    title: 'Built for South Africa',
    desc: 'We understand the local market. From PayFast and Yoco to POPIA compliance, everything we build is made for SA businesses.',
  },
  {
    icon: '🤝',
    title: 'No middlemen',
    desc: 'You talk directly to the people building your product. No account managers, no long email chains, no lost context.',
  },
  {
    icon: '⚡',
    title: 'Fast turnaround',
    desc: 'We run frontend and backend in parallel. Most projects go from first call to live site in two to four weeks.',
  },
  {
    icon: '🛡️',
    title: 'Support after launch',
    desc: 'We do not disappear once the site is live. Our care plan keeps your site fast, secure, and up to date every month.',
  },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">

        <div className="about__text">
          <div className="section-tag">Who we are</div>
          <h2 className="section-title">A digital agency<br />that actually<br />delivers.</h2>
          <p className="about__body">
            Elevate Digital Solutions is a Johannesburg-based web development
            agency built for local businesses. We combine backend engineering,
            frontend design, and business development under one roof — so you
            get a complete product, not just a pretty template.
          </p>
          <p className="about__body">
            We started Elevate because too many SA businesses were either
            overpaying for basic websites or settling for cheap work that hurt
            their credibility. There is a better way.
          </p>
          <a href="#contact" className="btn-primary about__cta">
            Start a project
          </a>
        </div>

        <div className="about__values">
          {values.map(value => (
            <div key={value.title} className="about__value-card">
              <div className="about__value-icon">{value.icon}</div>
              <div>
                <div className="about__value-title">{value.title}</div>
                <div className="about__value-desc">{value.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}