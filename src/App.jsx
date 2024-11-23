
import './App.css'
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import Home from './templates/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
       <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUpPage/>} />
      {/* <Route path="/signup" element={<SignupPage />} /> */}
    </Routes>
  </Router>
    </>
  )
}

export default App
