import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

interface CryptoChartProps {
  coinId: string;  // El ID de la criptomoneda seleccionada
  apiKey: string;  // La API key de CoinGecko
}

const CryptoChart: React.FC<CryptoChartProps> = ({ coinId, apiKey }) => {
  const [days, setDays] = useState(1); // Estado para los días (5, 15, 30)
  const [chartData, setChartData] = useState<number[][]>([]); // Datos de la gráfica
  const [loading, setLoading] = useState(true); // Controla el estado de carga

  // Configuración del gráfico con ApexCharts
  const chartOptions = {
    chart: {
      type: 'line',
      zoom: { enabled: false }
    },
    xaxis: { type: 'datetime' },
    stroke: { curve: 'smooth' },
    title: { 
        text: 'Precio Histórico', 
        align: 'left',
    },
    yaxis: { 
        title: { text: 'Precio (USD)' },
        labels: {
            formatter: (value: number) => value.toFixed(2), // Limitar a 2 decimales
          }
    },
    colors: ['#646363', '#545454'],
  };

  // Función para obtener los datos del gráfico desde la API de CoinGecko
  const fetchChartData = async (days: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${apiKey}`
      );
      const data = await response.json();
      setChartData(data.prices); // Guardamos los precios
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setLoading(false);
    }
  };

  // useEffect para cargar los datos cuando cambie el número de días o la criptomoneda
  useEffect(() => {
    fetchChartData(days);
  }, [days, coinId]);

  return (
    <div className="crypto-chart">
      <h2>Gráfica de {coinId} - Apexcharts.js</h2>

      {/* Selector para los últimos 5, 15 o 30 días */}
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

      {/* Muestra "Cargando..." mientras esperamos los datos */}
      {loading ? (
        <div>Cargando datos...</div>
      ) : (
        <ApexCharts
          options={chartOptions}
          series={[
            {
              name: 'Precio',
              data: chartData.map(([timestamp, price]) => [timestamp, price]) // Formato [x, y]
            }
          ]}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default CryptoChart;
