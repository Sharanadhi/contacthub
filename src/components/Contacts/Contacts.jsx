import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Datatables from '../Datatables/Datatables';
import './Contacts.scss';

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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}contacts`, {
          headers: {
            authorization: `Bearer ${token}`
          }
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
    <section className="contacts">
      <Sidebar />
      <div className='contacts__card'>
        <div className="contacts__card-header">
          <h1 className='contacts__heading'>Contacts</h1>
        <Link to={`/contacts/create`} className='contacts__link'>Create</Link>
        </div>
        <div className='contacts__card-body'>
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && <Datatables data={contacts} />}
        </div>
      </div>
    </section>
  );
}

export default Contacts;
