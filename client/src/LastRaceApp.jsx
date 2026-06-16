import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ResultsPage from './pages/results-page/ResultsPage'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import {IsLoggedInContext} from './Contexts'
import GamePage from './pages/game-pages/GamePage'

function LastRaceApp() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ask to server if the user is logged in and set properly isLoggedIn state
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

  // Enable client-side navigation through React Router
  return (
    <>
      <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route path="/logout" element={isLoggedIn ? <LogoutPage/> : <Navigate to="/login" replace />} />
            <Route path="/results" element={isLoggedIn ? <ResultsPage /> : <Navigate to="/login" replace />} />
            <Route path="/game" element={isLoggedIn ? <GamePage /> : <Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </IsLoggedInContext.Provider>
    </>
  );
}

export default LastRaceApp
