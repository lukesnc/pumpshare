// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import { Home, Signup, Login, ExerciseLibrary, ActivityFeed, Profile, Follow } from "./pages";
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
        <Route path="/activity" element={<ActivityFeed />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/:follow" element={<Follow />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
