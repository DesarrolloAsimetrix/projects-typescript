import React from 'react'

interface Crypto {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

interface CryptoDetailsProps {
  crypto: Crypto
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ crypto }) => (
  <div className="crypto-details">
    <div className="crypto-header">
      <img src={crypto.image} alt={crypto.name} />
      <div>
        <h2>{crypto.name}</h2>
        <p>{crypto.symbol.toUpperCase()}</p>
      </div>
    </div>
    <div className="crypto-grid">
      <div className="crypto-card">
        <h3>Price</h3>
        <p>${crypto.current_price.toLocaleString()}</p>
      </div>
      <div className="crypto-card">
        <h3>24h Change</h3>
        <p className={`price-change ${crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}`}>
          <span className="trend-icon"></span>
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
      <div className="crypto-card">
        <h3>Market Cap</h3>
        <p>${crypto.market_cap.toLocaleString()}</p>
      </div>
    </div>
  </div>
)

export default CryptoDetails