import HomePage from './pages/home-page/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ResultsPage from './pages/results-page/ResultsPage'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import IsLoggedInContext from './contexts/IsLoggedInContext'
import GamePage from './pages/GamePage'

function LastRaceApp() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/users/me", {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }).catch(() => {
        setIsLoggedIn(false);
      });
  }, []);


  return (
    <>
      <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={isLoggedIn ? <LogoutPage/> : <Navigate to="/login" replace />} />           {/* TO DO */}
            <Route path="/results" element={isLoggedIn ? <ResultsPage /> : <Navigate to="/login" replace />} />         {/* TO DO */}
            <Route path="/game" element={isLoggedIn ? <GamePage /> : <Navigate to="/login" replace />} />         {/* TO DO */}
          </Routes>
        </BrowserRouter>
      </IsLoggedInContext.Provider>
    </>
  )
}

export default LastRaceApp
