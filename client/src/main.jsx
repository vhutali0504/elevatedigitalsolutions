import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/base.css'
import './styles/motion.css'
import './styles/site.css'
import './styles/minisite.css'

// Entrance styles only apply once script is running, so content can never stay hidden.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
