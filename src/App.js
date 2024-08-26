import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderPage from './Pages/HeaderPage';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import FooterPage from './Pages/FooterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderPage />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        {/* <FooterPage /> Uncomment this if you want to include the footer */}
      </div>
      <FooterPage />
    </Router>
  );
}

export default App;
