// import Sidebar from '../Sidebar/Sidebar';
import Datatables from '../Datatables/Datatables';
import contacts_data from '../../data/MOCK_DATA.json';
import './Contacts.scss';

function Contacts() {
  return (
    <section className="contacts">
      {/* <Sidebar /> */}
      <div className='contacts__card'>
        <div className="contacts__card-header">
          <h1 className='contacts__heading'>Contacts</h1>
        </div>
        <div className='contacts__card-body'>
          <Datatables data={contacts_data} />
        </div>
      </div>
    </section>
  );
}

export default Contacts;
