import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Header from './components/Header/Header.tsx'
import Footer from './components/Footer/footer.tsx'
import CryptoMarket from './components/cryptomarket/cryptomarket.tsx'
import './index.css'
import './components/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <App />
    <CryptoMarket />
    <Footer />
  </StrictMode>,
)
