// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import { Home, Signup, Login, ExerciseLibrary } from "./pages";
import { Navbar } from "./components"; // Import all components here from components/index.js

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<ExerciseLibrary />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
