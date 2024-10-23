import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from './components/Signin/Signin.jsx'
import './App.scss'

function App() {
  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
