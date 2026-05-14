import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Services from './sections/Services'
import HowWeWork from './sections/HowWeWork'
import About from './sections/About'
import Contact from './sections/Contact'
import WhatsAppButton from './components/WhatsAppButton'




export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowWeWork />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}