// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages and Components
import { Home, Signup, Login } from './pages'
import { Navbar } from './components' // Import all components here from components/index.js


const App = ()  =>{
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
  );
};
export default App
