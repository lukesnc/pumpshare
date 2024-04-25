import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ExerciseLibrary = () => {
  // Use navigate hook
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");

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

  const handleExerciseChange = (e) => {
    setSelectedWorkout("");
    setSelectedExercise(e.target.value);
  };

  const handleWorkoutChange = (e) => {
    setSelectedExercise("");
    setSelectedWorkout(e.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    // The code below is wrong, but in the right direction.
    // And id of the workout or exercise is needed, plus an indicator of whether its a workout or an exercise
    // This will add a search parameter that should be handled by backend routes (obtain info from params)
    // const id = 1234;
    // const type = "workout";
    // const destination = {
    //   pathname: "/edit", // Replace with your actual route path
    //   search: new URLSearchParams({ id, type }).toString(), // Use URLSearchParams for query parameters
    // };
    // navigate(destination);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">Workout Library</h2>

        <h3>Workouts</h3>
        <form>
          <select
            id="workouts"
            className="border rounded-lg block w-full p-2.5 mb-3"
            onChange={handleWorkoutChange}
          >
            <option value="">Choose a workout</option>
            {workouts.map((workout) => (
              <option key={workout._id} value={workout.name}>
                {workout.name}
              </option>
            ))}
          </select>
        </form>

        <h3>Exercises</h3>
        <form>
          <select
            id="exercises"
            className="border rounded-lg block w-full p-2.5 mb-3"
            onChange={handleExerciseChange}
          >
            <option value="">Choose an exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise._id} value={exercise.name}>
                {exercise.name}
              </option>
            ))}
          </select>
        </form>

        {selectedWorkout !== "" || selectedExercise !== "" ? (
          <button type="submit" className="form-btn" onClick={handleEdit}>
            Edit {selectedWorkout || selectedExercise}
          </button>
        ) : (
          <button
            type="submit"
            className="form-btn-disabled"
            onClick={handleEdit}
            disabled
          >
            Edit
          </button>
        )}

        <button type="submit" className="form-btn-outline">
          <Link to="/create/workout">Create New Workout</Link>
        </button>
        <button type="submit" className="form-btn-outline">
          <Link to="/create/exercise">Create New Exercise</Link>
        </button>
      </div>
    </div>
  );
};

export default ExerciseLibrary;
