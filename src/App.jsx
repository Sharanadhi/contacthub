import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from './components/Signin/Signin.jsx'
import Signup from './components/Signup/Signup.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import CreateContact from './components/CreateContact/CreateContact.jsx'
import ContactDetails from './components/ContactDetails/ContactDetails.jsx';
import DealDetails from "./components/DealDetails/DealDetails.jsx";
import Deals from './components/Deals/Deals.jsx'

import './App.scss'

function App() {
  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/create" element={<CreateContact />} />
          <Route path="/contacts/:contactId" element={<ContactDetails />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:dealId" element={<DealDetails />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
