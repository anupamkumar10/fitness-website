import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WeightChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 p-8">No weight data available</div>;
  }

  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: data.map(item => item.weight),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Progress'
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export const CaloriesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 p-8">No calories data available</div>;
  }

  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calories Burned',
        data: data.map(item => item.burned),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Calories Consumed',
        data: data.map(item => item.consumed),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calories Tracking'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

