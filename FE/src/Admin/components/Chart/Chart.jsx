import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'News',
      data: [37, 42, 41, 37, 31, 44, 60],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
function Chart() {
  return (
    <div style={{ width: '600px', height: '400px' }}>
        <h4 className='text-center'>Thống kê bài viết</h4>
      <Bar options={options} data={data} />
    </div>
  )
}

export default Chart