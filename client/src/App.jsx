// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import {
  Home,
  Signup,
  Login,
  ExerciseLibrary,
  ActivityFeed,
  Profile,
  Follow,
  Log,
  Create,
  Dashboard,
} from "./pages";
import { Navbar } from "./components"; // Import all components here from components/index.js

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />ç
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<ExerciseLibrary />} />
        <Route path="/activity" element={<ActivityFeed />} />
        <Route path="/log" element={<Log />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/:follow" element={<Follow />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
