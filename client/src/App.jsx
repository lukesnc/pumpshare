// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './style'

// Pages and Components
import Home from './pages/Home'
import { Navbar } from './components' // Import all components here from components/index.js


const App = ()  =>{
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </BrowserRouter>
  );
};
export default App
