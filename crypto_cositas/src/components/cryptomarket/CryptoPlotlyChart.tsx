import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface CryptoPlotlyChartProps {
  coinId: string;
  apiKey: string;
  days: number;  // Recibimos los días como prop
}

const CryptoPlotlyChart: React.FC<CryptoPlotlyChartProps> = ({ coinId, apiKey, days }) => {
  const [chartData, setChartData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${apiKey}`
        );
        const data = await response.json();
        setChartData(data.prices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [days, coinId]);

  return (
    <div className="crypto-chart">
      <h3>Gráfica de {coinId} - Plotly.js</h3>
      {loading ? (
        <div>Cargando datos...</div>
      ) : (
        <Plot
          data={[
            {
              x: chartData.map(([timestamp]) => new Date(timestamp)),
              y: chartData.map(([, price]) => price),
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#646363' }
            }
          ]}
          layout={{ 
            xaxis: { title: 'Fecha' }, 
            yaxis: { title: 'Precio (USD)' } ,
            paper_bgcolor: 'transparent',  // Fondo transparente para todo el gráfico
            plot_bgcolor: 'transparent'    // Fondo transparente solo para el área del gráfico
        }}
        />
      )}
    </div>
  );
};

export default CryptoPlotlyChart;
