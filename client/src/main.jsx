import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LastRaceApp from './LastRaceApp.jsx'
import "./theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='last-race-container'>
        <LastRaceApp />
    </div>
  </StrictMode>,
)
