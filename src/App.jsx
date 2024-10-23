import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from './components/Signin/Signin.jsx'
import Signup from './components/Signup/Signup.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import './App.scss'

function App() {
  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
