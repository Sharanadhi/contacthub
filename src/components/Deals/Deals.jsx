import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Datatables from '../Datatables/Datatables';
import './Deals.scss';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}deals`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setDeals(response.data.deals);
        setLoading(false);
      } catch (error) {
        console.log(error);
        
        setError("Failed to fetch contacts data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="deals">
      <div className='deals__card'>
        <div className="deals__card-header">
          <h1 className='deals__heading'>Deals</h1>
        <Link to={`/deals/create`} className='deals__link'>Create</Link>
        </div>
        <div className='deals__card-body'>
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && <Datatables data={deals} type="deals" />}
        </div>
      </div>
    </section>
  );
}

export default Deals;