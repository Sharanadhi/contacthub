import {  Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { useBlockBackNavigation } from './hooks/useBlockBackNavigation.jsx';
import Signin from './components/Signin/Signin.jsx'
import Signup from './components/Signup/Signup.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import CreateContact from './components/CreateContact/CreateContact.jsx'
import ContactDetails from './components/ContactDetails/ContactDetails.jsx';
import DealDetails from "./components/DealDetails/DealDetails.jsx";
import Deals from './components/Deals/Deals.jsx'
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

import './App.scss'

function App() {
  useBlockBackNavigation();
  return (
    <>    
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contacts" element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
            } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/contacts/create" element={
            <ProtectedRoute>
              <CreateContact />
            </ProtectedRoute>
            } />
          <Route path="/contacts/:contactId" element={
            <ProtectedRoute>
              <ContactDetails />
            </ProtectedRoute>
            } />
          <Route path="/deals" element={
            <ProtectedRoute>
              <Deals />
            </ProtectedRoute>
            } />
          <Route path="/deals/:dealId" element={
            <ProtectedRoute>
              <DealDetails />
            </ProtectedRoute>
            } />
            <Route path="/*" element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
            } />
            
        </Routes>
    {/* </BrowserRouter> */}
    </>
  )
}

export default App
