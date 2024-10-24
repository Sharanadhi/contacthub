import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../TabPanel/TabPanel'
import Divider from '@mui/material/Divider';
import { FaPhone,FaEnvelope, FaCalendar, FaLocationArrow, FaAddressCard} from "react-icons/fa6";
import profile_img from '../../assets/img/people/p6.jpg'
// import Sidebar from '../Sidebar/Sidebar';
import CustomTimeline from '../CustomTimeline/CustomTimeline';
import './ContactDetails.scss'
import Sidebar from '../Sidebar/Sidebar';

function ContactDetails() {
  const [tabvalue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <section className='contactDetails'>
      <Sidebar />
      <div className="contactDetails__container">        
        <div className='profilecard'>
          <div className='profilecard__card-header'>
            <img src={profile_img} alt="profile image" className='profilecard__img'/>
            <div className='profilecard__titlebox'>
            <h3 className='profilecard__name'>Hannah Mckay</h3>
            <p className='profilecard__title'>Sr.manager</p>
            </div>
            <div className="profilecard__card-links">
              <a className='profilecard__link' href="#"><FaPhone /></a>
              <a className='profilecard__link' href="#"><FaEnvelope /></a>
              <a className='profilecard__link' href="#"><FaCalendar /></a>
              <a className='profilecard__link' href="#"><FaLocationArrow /></a>
            </div>
            <Divider className='divider' variant="middle" />
          </div>
          <div className="card-body">
            <dl>
              <dt className='profilecard__header'>Company</dt>
              <dd className='profilecard__value'>Google</dd>
              <dt className='profilecard__header'>Email</dt>
              <dd className='profilecard__value'>hannah.m@gmail.com</dd>
              <dt className='profilecard__header'>Mobile phone</dt>
              <dd className='profilecard__value'>7824093459</dd>
              <dt className='profilecard__header'>Business phone</dt>
              <dd className='profilecard__value'>9029199450</dd>
              <dt className='profilecard__header'>Address</dt>
              <dd className='profilecard__value'>10 Rosedale drive, dartmouth</dd>
            </dl>
          </div>        
        </div>
        <div className='detailscard'>
          <div className="detailscard__card-header">
            
            <Tabs className='detailscard__tabs' value={tabvalue} onChange={handleTabChange} aria-label="icon position tabs example">
              <Tab icon={<FaAddressCard />} iconPosition="start" label="Details"/>
              <Tab icon={<FaPhone />} iconPosition="start" label="Activity"/>
              <Tab icon={<FaCalendar />} iconPosition="start" label="Deals" />
              <Tab icon={<FaEnvelope />} iconPosition="start" label="Notes" />
            </Tabs>
          </div>
          <div className='detailscard__card-body'>
          <TabPanel value={tabvalue} index={0}>
            <section className='info'>
              <h2>Update</h2>
              <form className="info__form">
                <div className="input__group">
                  <select name="contact_status" className='select'>
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="Open">Open</option>
                    <option value="In progress">In progress</option>
                    <option value="Open deals">Open deals</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="input__group">
                  <textarea name="contact__comment" placeholder='Comments'></textarea>
                </div>
                <div className="btn__group">
                  <button className='primary__btn'>Update</button>
                </div>
              </form>
              <Divider className='divider' variant="middle"/>

            </section>
          </TabPanel>
          <TabPanel value={tabvalue} index={1}>
          <CustomTimeline />
          </TabPanel>
      <TabPanel value={tabvalue} index={2}>
        <section className='deals'>
          <h2>Deals</h2>
          <div className='deals__container'>
            <div className='deals__card'>
              <div className='deals__body'>
              <h3 className='deals__title'>Deal 1</h3>
              <p className='deals__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit suscipit eum totam adipisci tempora accusantium quasi ut, velit maxime tenetur repellat possimus aliquid quas! Vel aliquid itaque autem est.</p>
              </div>
              <div className='deals__footer'>
                <button className='primary__btn'>View</button>
              </div>
            </div>

            <div className='deals__card'>
              <div className='deals__body'>
              <h3 className='deals__title'>Deal 2</h3>
              <p className='deals__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit suscipit eum totam adipisci tempora accusantium quasi ut, velit maxime tenetur repellat possimus aliquid quas! Vel aliquid itaque autem est.</p>
              </div>
              <div className='deals__footer'>
                <button className='primary__btn'>View</button>
              </div>
            </div>

            <div className='deals__card'>
              <div className='deals__body'>
              <h3 className='deals__title'>Deal 3</h3>
              <p className='deals__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit suscipit eum totam adipisci tempora accusantium quasi ut, velit maxime tenetur repellat possimus aliquid quas! Vel aliquid itaque autem est.</p>
              </div>
              <div className='deals__footer'>
                <button className='primary__btn'>View</button>
              </div>
            </div>
          </div>
        </section>
      </TabPanel>
      <TabPanel value={tabvalue} index={3}>
        <section className='notes'>
          <h2 className='notes__text'>Notes</h2>
          <form className="notes__form">
            <div className='input__group'>
              <textarea name="notes_input" className='notes__input' placeholder='Add a note...'></textarea>
            </div>
            <div className='btn__group'>
              <button className='primary__btn'>Add</button>
            </div>
          </form>   
          <Divider className='divider' variant="middle" />
          <div className='notes__list'>
            <div className='notes__container'>
              <p className='notes__note'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt architecto quod veritatis modi iure, itaque officiis deserunt consequuntur necessitatibus consectetur molestias magnam sapiente ducimus. Eos reiciendis architecto iure facere non.</p>
              <p className='notes__date'>01/01/2024 03:09 pm</p>
            </div>  
            <Divider className='divider'  />
            <div className='notes__container'>
              <p className='notes__note'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt architecto quod veritatis modi iure, itaque officiis deserunt consequuntur necessitatibus consectetur molestias magnam sapiente ducimus. Eos reiciendis architecto iure facere non.</p>
              <p className='notes__date'>01/01/2024 03:09 pm</p>
            </div>  
            <Divider className='divider' />
            <div className='notes__container'>
              <p className='notes__note'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt architecto quod veritatis modi iure, itaque officiis deserunt consequuntur necessitatibus consectetur molestias magnam sapiente ducimus. Eos reiciendis architecto iure facere non.</p>
              <p className='notes__date'>01/01/2024 03:09 pm</p>
            </div>  
          </div>   
        </section>
      </TabPanel>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default ContactDetails