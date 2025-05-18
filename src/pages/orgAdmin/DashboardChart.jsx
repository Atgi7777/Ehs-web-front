import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Илгээсэн тайлан',
        data: [],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/reports-chart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('orgAdminToken')}`,
          }
        });

        const reports = response.data;

        const labels = reports.map(item => item.date);
        const data = reports.map(item => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Илгээсэн тайлан',
              data,
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('📊 Тайлангийн график дата авахад алдаа:', error);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-lg font-semibold mb-4">Тайлан илгээсэн</p>
      <Line data={chartData} options={options} height={200} />
    </div>
  );
};

export default DashboardChart;
