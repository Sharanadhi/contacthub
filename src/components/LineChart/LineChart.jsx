import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { LinearScale } from 'chart.js';

const LineChart = () => {
  Chart.register(LinearScale, ...registerables);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',],
    datasets: [
      {
        label: 'Contacts',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // return <Line data={data} options={options} />;
  return (
    <div>
      <h2>New Contacts trend</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
