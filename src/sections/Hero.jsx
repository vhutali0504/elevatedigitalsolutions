import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg" />
     {/* <div className="hero__grid" />*/}
      <div className="hero__content"></div>

      <div className="hero__content">
        <div className="hero__tag">Johannesburg, South Africa</div>

        <h1 className="hero__heading">
          Your business<br />
          deserves a <span className="hero__accent">real</span><br />
          website.
        </h1>

        <p className="hero__sub">
          We build professional websites, booking systems, and online stores
          for South African businesses. Fast, clean, and built to convert.
        </p>

        <div className="hero__actions">
          <a href="#services" className="btn-primary">View packages</a>
          <a href="#contact" className="btn-ghost">Get in touch</a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">3+</span>
            <span className="hero__stat-label">Service types</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">R500</span>
            <span className="hero__stat-label">Monthly care plan</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">SA</span>
            <span className="hero__stat-label">PayFast & Yoco ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}