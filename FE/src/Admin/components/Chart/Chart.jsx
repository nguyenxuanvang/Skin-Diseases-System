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
import Styles from './Chart.module.css';


function Chart({title,values}) {
  const count = (list, month) => {
    let count = 0;
    for(let i = 0; i < list?.length; i += 1) {
      const m = new Date(list[i].createdAt).getMonth() + 1;
      if(month === m) {
        count += 1;
      }
    }
    return count;
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: [
          count(values,1), 
          count(values,2), 
          count(values,3), 
          count(values,4), 
          count(values,5), 
          count(values,6), 
          count(values,7),
          count(values,8),
          count(values,9),
          count(values,10),
          count(values,11),
          count(values,12)
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div style={{ width: '1500px', height: '400px' }}>
        <h4 className={Styles.title}>Biểu Đồ {title}</h4>
      <Bar options={options} data={data} />
    </div>
  )
}

export default Chart