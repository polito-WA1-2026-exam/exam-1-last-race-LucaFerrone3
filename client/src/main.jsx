import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LastRaceApp from './LastRaceApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LastRaceApp />
  </StrictMode>,
)
