import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios'

import { Link } from 'react-router-dom';
import CardsContainer from '../CardsContainer/CardsContainer';
import './Contacts.scss';
import Navbar from '../Navbar/Navbar';

function Contacts() {
  const [contacts, setContacts] = useState([]);
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
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}contacts`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setContacts(response.data.contacts);
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
    <>
      <Navbar />
      <section className="contacts">
        <div className='contacts__card'>
          <div className="contacts__card-header">
            <h1 className='contacts__heading'>Contacts</h1>
            <div className='contacts__header-links'>
              <Link to={`/deals`} className='contacts__link'>Deals</Link>
              <Link to={`/contacts/create`} className='contacts__link'>Create</Link>
            </div>
          </div>
          <div className='contacts__card-body'>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && <CardsContainer data={contacts}  />}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacts;
