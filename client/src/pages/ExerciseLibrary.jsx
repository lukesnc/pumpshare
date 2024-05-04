import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ExerciseLibrary = () => {
  // Use navigate hook
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [logData, setLogData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [isExercise, setIsExercise] = useState("");

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const r = await fetch("/api/workouts");
        const data = await r.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchWorkoutData();
  }, []);

  useEffect(() => {
    localStorage.removeItem("workoutFormState");
    const fetchExerciseData = async () => {
      try {
        const r = await fetch("/api/exercises");
        const data = await r.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchExerciseData();
  }, []);

  const handleExerciseChange = (e) => {
    setIsExercise(1);
    setSelectedExercise(e.target.value);
    setSelectedWorkout("");
  };

  const handleWorkoutChange = (e) => {
    setIsExercise(0);
    setSelectedWorkout(e.target.value);
    setSelectedExercise("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (isExercise == 1) {
    } else {
      try {
        const data = selectedWorkout;
        navigate("/update", { state: { workout: data } });
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    }
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
            onClick={handleExerciseChange}
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
