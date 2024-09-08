import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Downloads from './pages/downloads.js';
import Donate from './pages/donate.js';
import ThankYou from './pages/thankyou.js';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="app">
      <header className="header">
        <div className="logo"><Link to="/">Nate's Downloads</Link></div>
        <nav className="menu">
          <ul>
            <li><Link to="/downloads">Downloads</Link></li>
            <li><a href="https://support.natemarcellus.com" target="_blank" rel="noopener noreferrer">Support</a></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/thank-you/:downloadName" element={<ThankYou />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© 2024 Nate's Downloads. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to Nate's Downloads</h1>
        <p>Your one-stop destination for all your download needs. Explore our tools and utilities designed to enhance your experience.</p>
        <button className="cta-button"><Link to="/downloads">Get Started</Link></button>
      </section>
      <section className="features">
        <div className="feature">
          <h2>Missionchief Bot</h2>
          <p>Automate your Missionchief tasks with ease. Our bot ensures you stay ahead in the game.</p>
        </div>
        <div className="feature">
          <h2>Personal Launcher</h2>
          <p>Launch your favorite applications quickly and efficiently with our Personal Launcher.</p>
        </div>
        <div className="feature">
          <h2>Military Chief (WIP)</h2>
          <p>Experience a new spin-off of Missionchief tailored for military operations. Stay tuned for updates!</p>
        </div>
      </section>
    </>
  );
}

export default App;
