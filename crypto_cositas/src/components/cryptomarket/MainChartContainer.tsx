import React, { useState } from 'react';
import CryptoApexChart from './CryptoApexChart';
import CryptoPlotlyChart from './CryptoPlotlyChart';
import './MainChartContainer.css'; // Importar el archivo CSS para el tooltip

interface MainChartContainerProps {
  coinId: string;
  apiKey: string;
}

const MainChartContainer: React.FC<MainChartContainerProps> = ({ coinId, apiKey }) => {
  const [days, setDays] = useState(1); // Estado para el número de días
  const [showAverage, setShowAverage] = useState(false);  // Estado para la media
  const [showBollingerBands, setShowBollingerBands] = useState(false);  // Estado para las bandas de Bollinger

  return (
    <div>
      <h2>Visualización de Precios de {coinId}</h2>

      {/* Botones para seleccionar los días */}
      <div className="days-selector">
        <button onClick={() => setDays(1)} className={days === 1 ? 'active' : ''}>
          Último día
        </button>
        <button onClick={() => setDays(5)} className={days === 5 ? 'active' : ''}>
          Últimos 5 días
        </button>
        <button onClick={() => setDays(15)} className={days === 15 ? 'active' : ''}>
          Últimos 15 días
        </button>
        <button onClick={() => setDays(30)} className={days === 30 ? 'active' : ''}>
          Últimos 30 días
        </button>
      </div>

      {/* Checkboxes para la media y las Bandas de Bollinger */}
      <div className="analysis-options">
        <label className="tooltip">
          <input
            type="checkbox"
            checked={showAverage}
            onChange={() => setShowAverage(!showAverage)}
          />
          Media Promedio Móvil
          <span className="tooltiptext">Compra cuando el precio esté debajo de la media. Vende cuando esté por encima.</span>
        </label>
        <label className="tooltip">
          <input
            type="checkbox"
            checked={showBollingerBands}
            onChange={() => setShowBollingerBands(!showBollingerBands)}
          />
          Bandas de Bollinger
          <span className="tooltiptext">Compra cuando el precio toque la banda inferior. Vende cuando toque la superior.</span>
        </label>
      </div>
      
      {/* Componentes de gráficos */}
      <div className="chart-container">
      <CryptoApexChart coinId={coinId} apiKey={apiKey} days={days} showAverage={showAverage}
          showBollingerBands={showBollingerBands}/>
      <CryptoPlotlyChart coinId={coinId} apiKey={apiKey} days={days} showAverage={showAverage}
          showBollingerBands={showBollingerBands}/>
      </div>
    </div>
  );
};

export default MainChartContainer;
