import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ExerciseLibrary = () => {
  // Use navigate hook
  useNavigate();

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const r = await fetch("/api/workouts");
        const data = await r.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchUserData();
  }, []);

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const r = await fetch("/api/exercises");
        const data = await r.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">Workout Library</h2>

        <h3>Workouts</h3>
        <form>
          <select id="workouts" className="border rounded-lgblock w-full p-2.5">
            <option selected>Choose a workout</option>
            {workouts.map((e) => (
              <option key={e._id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </form>

        <h3>Exercises</h3>
        <form>
          <select
            id="exercises"
            className="border rounded-lgblock w-full p-2.5"
          >
            <option selected>Choose an exercise</option>
            {exercises.map((e) => (
              <option key={e._id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </form>

        <button type="submit" className="form-btn">
          <Link to="/">Create New Workout</Link>
        </button>
        <button type="submit" className="form-btn">
          <Link to="/create-exercise">Create New Exercise</Link>
        </button>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
