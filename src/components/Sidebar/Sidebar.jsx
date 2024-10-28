import { useState } from 'react';
import './Sidebar.scss';
import {  FaRegAddressCard, FaHotjar,  FaAlignJustify,FaAngleDoubleLeft,FaRegChartBar } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
      
        {isOpen ? <FaAngleDoubleLeft className="sidebar-icon" /> : <FaAlignJustify className="sidebar-icon" />}
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li>
           <a href="#">
           <FaRegChartBar className="sidebar-icon" />
           {isOpen && <span>Dashboard</span>}
           </a>
          </li>
          <li>
            <a href="/contacts">
            <FaRegAddressCard className="sidebar-icon" />
            {isOpen && <span>Contacts</span>}
            </a>
          </li>
          <li>
           <a href="#">
           <FaHotjar className="sidebar-icon" />
           {isOpen && <span>Deals</span>}
           </a>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
