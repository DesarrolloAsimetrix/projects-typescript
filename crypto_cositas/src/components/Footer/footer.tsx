// src/components/Footer/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Crito Cositas. Only Ponzi data.</p>
        <nav className="footer-links">
          <a href="#terms">Términos de uso</a>
          <a href="#privacy">Política de privacidad</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
