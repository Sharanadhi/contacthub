import { Scatter } from 'react-chartjs-2';

const ScatterChart = () => {
  const data = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          { x: -10, y: 0 },
          { x: -5, y: 5 },
          { x: 0, y: 10 },
          { x: 5, y: 5 },
          { x: 10, y: 0 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Deals won</h2>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ScatterChart;
