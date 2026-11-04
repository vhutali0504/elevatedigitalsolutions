import { useState } from 'react'
import Hero from '../components/home/Hero'
import Capabilities from '../components/home/Capabilities'
import TechBand from '../components/home/TechBand'
import Builder from '../components/home/Builder'
import Process from '../components/home/Process'
import CityBand from '../components/home/CityBand'
import About from '../components/home/About'
import Faq from '../components/home/Faq'
import Contact from '../components/home/Contact'
import MobileBar from '../components/MobileBar'
import { usePageMeta } from '../hooks/usePageMeta'

const scrollTo = (id, focusId) => {
  document.getElementById(id)?.scrollIntoView()
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true })
}

export default function Home() {
  usePageMeta({
    title: 'EDS | Elevate Digital Solutions, freelance web development in Johannesburg',
    description: 'A freelance web development partnership in Johannesburg. Websites, booking systems and online stores for South African businesses, from R2,500.',
    path: '/',
  })
  const [pick, setPick] = useState(null)
  const [prefill, setPrefill] = useState(null)

  return (
    <>
      <Hero />
      <Capabilities
        onPick={(cat, tier) => {
          setPick({ cat, tier })
          scrollTo('packages')
        }}
      />
      <TechBand />
      <Builder
        pick={pick}
        onQuote={(service, message) => {
          setPrefill({ service, message })
          scrollTo('contact', 'name')
        }}
      />
      <Process />
      <CityBand />
      <About />
      <Faq />
      <Contact prefill={prefill} />
      <MobileBar />
    </>
  )
}
