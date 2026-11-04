import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ConsentBanner from './components/ConsentBanner'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'

const Thanks = lazy(() => import('./pages/Thanks'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Refunds = lazy(() => import('./pages/Refunds'))
const Cookies = lazy(() => import('./pages/Cookies'))
const Credits = lazy(() => import('./pages/Credits'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollManager />
        <a className="skip" href="#main">Skip to content</a>
        <ConsentBanner />
        <Nav />
        <main id="main">
          <Suspense fallback={<p className="page-loading" role="status">Loading the page…</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refunds" element={<Refunds />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  )
}
