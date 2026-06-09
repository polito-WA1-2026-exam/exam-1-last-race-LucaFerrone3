import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ResultsPage from './pages/ResultsPage'
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
