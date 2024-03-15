import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExerciseLibrary = () => {
  // Use navigate hook
  useNavigate();

  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("api/user/routines")
      .then((response) => response.json())
      .then((data) => setRoutines(data))
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("api/user/exercises")
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">Exercise Library</h2>

        <h3>Routines</h3>
        <form>
          <select id="routines" className="border rounded-lgblock w-full p-2.5">
            <option selected>Choose a routine</option>
            {routines.map((r) => (
              <option key={r.id} value={r.value}>
                {r.label}
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
              <option key={e.id} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </form>

        <button type="submit" className="form-btn">
          Create New Routine
        </button>
        <button type="submit" className="form-btn">
          Create New Exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
