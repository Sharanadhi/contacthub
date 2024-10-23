import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from './components/Signin/Signin.jsx'
import Signup from './components/Signup/Signup.jsx'
import './App.scss'

function App() {
  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
