import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

interface CryptoApexChartProps {
  coinId: string;
  apiKey: string;
  days: number;  // Recibimos los días como prop
}

const CryptoApexChart: React.FC<CryptoApexChartProps> = ({ coinId, apiKey, days }) => {
  const [chartData, setChartData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);

  const chartOptions = {
    chart: {
      type: 'line',
      zoom: { enabled: false }
    },
    xaxis: { type: 'datetime' },
    stroke: { curve: 'smooth' },
    yaxis: {
      title: { text: 'Precio (USD)' },
      labels: { formatter: (value: number) => value.toFixed(2) }
    },
    colors: ['#011936', '#545454'],
  };

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
      <h3>Gráfica de {coinId} - ApexCharts.js</h3>
      {loading ? (
        <div>Cargando datos...</div>
      ) : (
        <ApexCharts
          options={chartOptions}
          series={[
            { name: 'Precio', data: chartData.map(([timestamp, price]) => [timestamp, price]) }
          ]}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default CryptoApexChart;
