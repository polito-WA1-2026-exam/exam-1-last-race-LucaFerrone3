import HomePage from './components/HomePage'
import SignUpPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import LogoutPage from './components/LogoutPage'
import ResultsPage from './components/ResultsPage'

import { Routes, Route, BrowserRouter } from "react-router-dom"

function LastRaceApp() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />                   {/* TO DO */}
        <Route path="/sign-up" element={<SignUpPage />} />          {/* TO DO */}
        <Route path="/login" element={<LoginPage />} />             {/* TO DO */}
        <Route path="/logout" element={<LogoutPage />} />           {/* TO DO */}
        <Route path="/results" element={<ResultsPage />} />         {/* TO DO */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default LastRaceApp
