import LineChart from '../LineChart/LineChart.jsx'
// import DoughnutChart from '../DoughnutChart/Doughnut.jsx';
import ScatterChart from '../ScatterChart/ScatterChart.jsx';
import BarChart from '../BarChart/BarChart.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import './Dashboard.scss'

function Dashboard() {
  return (
    <>
      <Navbar />
      <section className='dashboard'>
      <div className="dashboard__container">
        <div className="dashboard__row">
          <div className='card card__count-success'>
            <p>Total contacts</p>
            <h2>10,000</h2>
          </div>
          <div className='card card__count-warning'>
            <p>Total Deals</p>
            <h2>30,000</h2>
          </div>
          <div className='card card__count-dark'>
            <p>Deals won</p>
            <h2>7,500</h2>
          </div>
          <div className='card card__count-primary'>
            <p>Overall Revenue</p>
            <h2>$ 25,902</h2>
          </div>
        </div>
        <div className="dashboard__row">
        <div className='card'>
          <LineChart />
        </div>

        <div className='card'>
          <BarChart />
        </div>

        <div className='card'>
          <ScatterChart />
        </div>
        </div>
        {/* <div className="dashboard__row">
        <div className='card card__graph'>
          <DoughnutChart />
        </div>
        <div className='card'></div>
        <div className='card'></div>
        </div> */}
        
      </div>
    </section>
    </>
  );
}

export default Dashboard;