import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

interface CryptoPlotlyChartProps {
  coinId: string;
  apiKey: string;
  days: number;
  showAverage: boolean;
  showBollingerBands: boolean;
}

const CryptoPlotlyChart: React.FC<CryptoPlotlyChartProps> = ({ coinId, apiKey, days, showAverage, showBollingerBands }) => {
  const [chartData, setChartData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
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

  useEffect(() => {
    fetchChartData();
  }, [days, coinId]);

  // Función para calcular la media móvil de los últimos 24 puntos
  const calculateMovingAverage = (windowSize = 24) => {
    return chartData.map(([, price], index) => {
      if (index < windowSize) return null; // Ignorar los primeros puntos sin suficientes datos
      const windowSlice = chartData.slice(index - windowSize, index);
      const average = windowSlice.reduce((sum, [, price]) => sum + price, 0) / windowSize;
      return [chartData[index][0], average];
    }).filter((point) => point !== null);
  };

  // Función para calcular las Bandas de Bollinger
  const calculateBollingerBands = (windowSize = 24) => {
    const prices = chartData.map(([, price]) => price);
    const movingAvg = prices.map((_, i) => {
      if (i < windowSize) return null;
      const slice = prices.slice(i - windowSize, i);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      return sum / windowSize;
    });

    const stdDev = prices.map((_, i) => {
      if (i < windowSize) return null;
      const slice = prices.slice(i - windowSize, i);
      const mean = slice.reduce((acc, val) => acc + val, 0) / windowSize;
      const variance = slice.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / windowSize;
      return Math.sqrt(variance);
    });

    const upperBand = movingAvg.map((avg, i) => (avg !== null ? avg + 2 * stdDev[i] : null));
    const lowerBand = movingAvg.map((avg, i) => (avg !== null ? avg - 2 * stdDev[i] : null));

    return {
      upperBand: chartData.map(([timestamp], i) => [timestamp, upperBand[i]]).filter(([, val]) => val !== null),
      lowerBand: chartData.map(([timestamp], i) => [timestamp, lowerBand[i]]).filter(([, val]) => val !== null)
    };
  };

  // Calcular las series de Bollinger y la media móvil si se activan
  const bollingerBands = calculateBollingerBands();
  const movingAverage = calculateMovingAverage();

  // Datos principales del gráfico
  const plotData = [
    {
      x: chartData.map(([timestamp]) => new Date(timestamp)),
      y: chartData.map(([, price]) => price),
      type: 'scatter',
      mode: 'lines',
      name: 'Precio',
      line: { color: '#011936' }
    }
  ];

  // Añadir la media móvil si está activada
  if (showAverage) {
    plotData.push({
      x: movingAverage.map(([timestamp]) => new Date(timestamp)),
      y: movingAverage.map(([, avgPrice]) => avgPrice),
      type: 'scatter',
      mode: 'lines',
      name: 'Media Móvil (24 puntos)',
      line: { dash: 'dot', color: '#808c9a' }
    });
  }

  // Añadir las Bandas de Bollinger si están activadas
  if (showBollingerBands) {
    const { upperBand, lowerBand } = bollingerBands;

    // Banda Inferior
    plotData.push({
      x: lowerBand.map(([timestamp]) => new Date(timestamp)),
      y: lowerBand.map(([, lower]) => lower),
      type: 'scatter',
      mode: 'lines',
      name: 'Banda Inferior',
      line: { dash: 'dot', color: '#dddddd' }
    });

    // Banda Superior con área sombreada
    plotData.push({
      x: upperBand.map(([timestamp]) => new Date(timestamp)),
      y: upperBand.map(([, upper]) => upper),
      type: 'scatter',
      mode: 'lines',
      name: 'Banda Superior',
      line: { dash: 'dot', color: '#dddddd' },
      fill: 'tonexty',  // Relleno del área entre esta banda y la siguiente
      fillcolor: 'rgba(50,50,50,0.2)'  // Color de relleno con opacidad
    });
  }

  return (
    <div className="crypto-chart">
      <h3>Gráfica de {coinId} - Plotly.js</h3>
      {loading ? (
        <div>Cargando datos...</div>
      ) : (
        <Plot
          data={plotData}
          layout={{ xaxis: { title: 'Fecha' }, yaxis: { title: 'Precio (USD)' }, showlegend: true ,paper_bgcolor: 'transparent',  // Fondo transparente para todo el gráfico
          plot_bgcolor: 'transparent'    // Fondo transparente solo para el área del gráfico
          }}
        />
      )}
    </div>
  );
};

export default CryptoPlotlyChart;
