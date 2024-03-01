// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './style'

// Pages and Components
import { Home, Signup } from './pages'
import { Navbar } from './components' // Import all components here from components/index.js


const App = ()  =>{
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </BrowserRouter>
  );
};
export default App
