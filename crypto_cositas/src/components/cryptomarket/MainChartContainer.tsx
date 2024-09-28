import React, { useState } from 'react';
import CryptoApexChart from './CryptoApexChart';
import CryptoPlotlyChart from './CryptoPlotlyChart';

interface MainChartContainerProps {
  coinId: string;
  apiKey: string;
}

const MainChartContainer: React.FC<MainChartContainerProps> = ({ coinId, apiKey }) => {
  const [days, setDays] = useState(1); // Estado para el número de días

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

      {/* Componentes de gráficos */}
      <CryptoApexChart coinId={coinId} apiKey={apiKey} days={days} />
      <CryptoPlotlyChart coinId={coinId} apiKey={apiKey} days={days} />
    </div>
  );
};

export default MainChartContainer;
