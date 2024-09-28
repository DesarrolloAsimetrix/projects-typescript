import React, { useState, useEffect } from 'react'
import CryptoListItem from './CryptoListItem'
import CryptoDetails from './CryptoDetails'
import CryptoApex from './cryptoApexChart'

interface Crypto {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

const CryptoMarket: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null)
  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

  useEffect(() => {
    // Usamos backticks para interpolar correctamente la API key
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&x_cg_demo_api_key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setCryptos(data)
        setSelectedCrypto(data[0])
      })
      .catch(error => console.error('Error fetching crypto data:', error))
  }, [apiKey]) // Asegúrate de que `apiKey` esté como dependencia en el useEffect

  if (cryptos.length === 0) return <div className="loading">Loading...</div>

  return (
    <div className="container">
      <div className="crypto-list">
        {cryptos.map(crypto => (
          <CryptoListItem
            key={crypto.id}
            crypto={crypto}
            isSelected={selectedCrypto?.id === crypto.id}
            onSelect={() => setSelectedCrypto(crypto)}
          />
        ))}
      </div>
      <div className="crypto-details-container">
        {selectedCrypto && (
          <>
            <CryptoDetails crypto={selectedCrypto} />
            <CryptoApex coinId={selectedCrypto.id} apiKey={apiKey} /> {/* Incluimos el gráfico */}
          </>
        )}
      </div>
    </div>
  )
}

export default CryptoMarket