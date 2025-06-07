import React, { useState } from 'react';
import '../styles/Navbar.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" fill="#0000" stroke="#B8860B" strokeWidth="2" />
          <text x="7" y="17" fontSize="12" fontWeight="bold" fill="#333">₹</text>
        </svg>
        <h2 className="navbar__brand">PaisaTracker</h2>
      </div>

      <button className="navbar__hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav className={`navbar__menu ${isOpen ? 'navbar__menu--active' : ''}`}>
        <div className="navbar__links">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
          <a href="#">Company</a>
        </div>
        <div className="navbar__buttons">
          <button className="navbar__button--primary">Sign in</button>
          <button className="navbar__button--secondary">Get started</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
