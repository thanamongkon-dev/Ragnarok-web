import './App.css'
import Welcome from './pages/Welcome.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/register.jsx'
import PromptPayQRCode from './components/PromptPayQRCode';
import LoginComponent from './components/LoginComponent.jsx';
import Member from './components/Member.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    // <div className='overflow-x-hidden scroll-smooth'>
    //   <Home />
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div className='overflow-x-hidden scroll-smooth'>
          <Welcome />
        </div>
      } />
      <Route path="/home" element={
        <div className='overflow-x-hidden scroll-smooth'>
          <Home />
        </div>
      } />

      <Route path="/register" element={
          <Register />
      } />
      <Route path="/donate" element={
          <LoginComponent />
      } />
      <Route path="/member" element={
          <Member />
      } />
    </Routes>
  </BrowserRouter>
  )
}

export default App
