import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

interface CryptoApexChartProps {
  coinId: string;
  apiKey: string;
  days: number;
  showAverage: boolean;  // Nueva prop para mostrar la media
  showBollingerBands: boolean;  // Nueva prop para mostrar las Bandas de Bollinger
}

const CryptoApexChart: React.FC<CryptoApexChartProps> = ({ coinId, apiKey, days, showAverage, showBollingerBands }) => {
  const [chartData, setChartData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);

  // Opciones para ApexCharts
  const chartOptions = {
    chart: {
      type: 'line',
      zoom: { enabled: true }
    },
    xaxis: { type: 'datetime' },
    stroke: { curve: 'smooth' },
    yaxis: {
      title: { text: 'Precio (USD)' },
      labels: { formatter: (value: number) => value.toFixed(2) }
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  };

  // Función para obtener los datos del gráfico desde la API de CoinGecko
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
  const calculateMovingAverage = (windowSize = 20) => {
    return chartData.map(([, price], index) => {
      if (index < windowSize) {
        // Si no hay suficientes puntos, no mostramos la media móvil (devuelve null)
        return [chartData[index][0], null];
      }
      
      // Tomamos los últimos "windowSize" puntos
      const windowSlice = chartData.slice(index - windowSize, index);
      const average = windowSlice.reduce((sum, [, price]) => sum + price, 0) / windowSize;

      // Devolvemos el promedio móvil en ese punto
      return [chartData[index][0], average];
    }).filter(([, price]) => price !== null);  // Filtrar los puntos sin media móvil
  };
  // Función para calcular la media
  /*
  const calculateAverage = () => {
    const total = chartData.reduce((acc, [, price]) => acc + price, 0);
    return chartData.map(([timestamp]) => [timestamp, total / chartData.length]);
  };
  */
  // Función para calcular las Bandas de Bollinger
  const calculateBollingerBands = () => {
    const prices = chartData.map(([, price]) => price);
    const period = 20;
    const movingAvg = prices.map((_, i) => {
      if (i < period) return null;
      const slice = prices.slice(i - period, i);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      return sum / period;
    });

    const stdDev = prices.map((_, i) => {
      if (i < period) return null;
      const slice = prices.slice(i - period, i);
      const mean = slice.reduce((acc, val) => acc + val, 0) / period;
      const variance = slice.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / period;
      return Math.sqrt(variance);
    });

    const upperBand = movingAvg.map((avg, i) => (avg !== null ? avg + 2 * stdDev[i] : null));
    const lowerBand = movingAvg.map((avg, i) => (avg !== null ? avg - 2 * stdDev[i] : null));

    return {
      upperBand: chartData.map(([timestamp], i) => [timestamp, upperBand[i]]).filter(([, val]) => val !== null),
      lowerBand: chartData.map(([timestamp], i) => [timestamp, lowerBand[i]]).filter(([, val]) => val !== null)
    };
  };

  const series = [
    {
      name: 'Precio',
      data: chartData.map(([timestamp, price]) => [timestamp, price]),
      color: '#011936'
    }
  ];

  // Añadir la media si está activada
  if (showAverage) {
    series.push({
    name: 'Media Móvil (20 puntos)',
    data: calculateMovingAverage(),
    stroke: { dashArray: 3 },
    color: '#808c9a'
    });
  }

  // Añadir las Bandas de Bollinger si están activadas
  if (showBollingerBands) {
    const { upperBand, lowerBand } = calculateBollingerBands();
    series.push({
      name: 'Banda Superior',
      data: upperBand,
      stroke: { curve: 'smooth',
        dashArray: 5 },
      color: '#dddddd'
    });
    series.push({
      name: 'Banda Inferior',
      data: lowerBand,
      stroke: { curve: 'smooth',
        dashArray: 5},
      color: '#dddddd'
    });
  }

  return (
    <div className="crypto-chart">
      <h3>Gráfica de {coinId} - ApexCharts.js</h3>
      {loading ? (
        <div>Cargando datos...</div>
      ) : (
        <ApexCharts
          options={chartOptions}
          series={series}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default CryptoApexChart;
