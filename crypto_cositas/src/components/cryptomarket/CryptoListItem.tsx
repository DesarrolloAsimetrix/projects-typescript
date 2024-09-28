import React from 'react'

interface Crypto {
  id: string
  symbol: string
  name: string
  image: string
}

interface CryptoListItemProps {
  crypto: Crypto
  isSelected: boolean
  onSelect: () => void
}
// este es el componente que se encarga de mostrar la lista de criptomonedas
// que se encuentra en la parte izquierda de la pantalla
// son los iconos de las criptomonedas 
const CryptoListItem: React.FC<CryptoListItemProps> = ({ crypto, isSelected, onSelect }) => (
  <div
    className={`crypto-list-item ${isSelected ? 'selected' : ''}`}
    onClick={onSelect}
  >
    <img src={crypto.image} alt={crypto.name} />
    <div>
      <h3>{crypto.name}</h3>
      <p>{crypto.symbol.toUpperCase()}</p>
    </div>
  </div>
)

export default CryptoListItem