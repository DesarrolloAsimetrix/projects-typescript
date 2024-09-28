// src/components/Header/Header.tsx
import React from 'react';
import viteLogo from '/vite.svg'; // Logo
import bitcoinLogo from '../../assets/bitcoin.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className="header">
    <header className="header">
      <div className="logo-container">
        <a href="https://bitcoin.org/es/" target="_blank" rel="noopener noreferrer">
          <img src={bitcoinLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <nav className="nav-links">
        <a href="#mercado">Mercado</a>
        <a href="#acerca">Acerca</a>
      </nav>
    </header>
    </div>
  );
};

export default Header;
