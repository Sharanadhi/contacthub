import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.scss'

function Navbar(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const signout = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }

  return(
    <nav className="navbar">
    <div className="navbar__logo"><Link to={"/contacts"}>ContactsHub</Link></div>
    <ul className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--active' : ''}`}>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      <li>
      <Link to={"/contacts"}>Contacts</Link>
        </li>
      <li>
        <Link to={"/deals"}>Deals</Link>
      </li>
      <li><a href="#" onClick={signout}>Sign out</a></li>
    </ul>
    <div className="navbar__toggle" onClick={handleMobileMenuToggle}>
      <span className="navbar__toggle-icon"></span>
      <span className="navbar__toggle-icon"></span>
      <span className="navbar__toggle-icon"></span>
    </div>
  </nav>
  )
}

export default Navbar