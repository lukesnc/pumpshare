// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import {
  Home,
  Signup,
  Login,
  Update,
  ExerciseLibrary,
  ActivityFeed,
  Profile,
  Follow,
  Log,
  LogWorkout,
  LogExercise,
  ViewWorkout,
  CreateExercise,
  CreateWorkout,
  Dashboard,
  ErrorPage,
  PostPage,
  Settings,
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
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/view/workout" element={<ViewWorkout />} />
        <Route path="/update" element={<Update />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create/exercise" element={<CreateExercise />} />
        <Route path="/create/workout" element={<CreateWorkout />} />
        <Route path="/log/workout" element={<LogWorkout />} />
        <Route path="/log/exercise" element={<LogExercise />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
