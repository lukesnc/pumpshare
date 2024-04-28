import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef, React } from "react";
import { logWorkout } from "../controllers/workoutController";
import { logExercise } from "../controllers/exerciseController";

const Log = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const [selectedLog, setSelectedLog] = useState("workout");

  const logFormString = localStorage.getItem("logFormState") || null;
  const logFormState = logFormString ? JSON.parse(logFormString) : null;

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await fetch("/api/workouts");
        const data = await res.json();
        console.log("data: ", data);
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    getWorkouts();
  }, []);
  useEffect(() => {
    const getExercises = async () => {
      try {
        // const res = await fetch("/api/exercises/populate-attributes");
        const res = await fetch("/api/exercises/");
        const data = await res.json();
        console.log("data: ", data);
        setExercises(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    getExercises();
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();
    console.log(values);
    if (selectedItem === "exercise") {
      try {
        const data = await logExercise(date, exercise, about, values);
        console.log("Result: ", data);
        //path to be changed once page is made for viewing single Workout
        navigate("/library", { state: { exercise: data } });
        //navigate("/view/exercise", { state: { exercise: data } });
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const data = await logWorkout(date, workout, about);
        console.log("Result: ", data);
        //path to be changed once page is made for viewing single Workout
        navigate("/library", { state: { workout: data } });
        //navigate("/view/workout", { state: { workout: data } });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full pt-3 pb-8 px-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <div className="flex border-b border-gray-200">
          <button
            className={`w-full py-2 text-center ${
              selectedLog === "workout"
                ? "border-b-2 border-b-emeraldMist font-semibold text-lg"
                : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedLog("workout");
            }}
          >
            Workout
          </button>
          <button
            className={`w-full py-2 text-center ${
              selectedLog === "exercise"
                ? "border-b-2 border-b-emeraldMist font-semibold text-lg"
                : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedLog("exercise");
            }}
          >
            Exercise
          </button>
        </div>

        <h1 className="my-6 text-xl font-semibold font-merriweather text-center">
          Log {selectedLog === "workout" ? "a workout" : "an exercise"}
        </h1>

        <form className="log-form" onSubmit={handleNext}>
          {selectedLog === "workout" ? (
            <div className="h-[150px] overflow-y-auto border rounded-md p-2 mb-4">
              <ul>
                {workouts.map((workout) => (
                  <li
                    key={workout._id}
                    value={workout.name}
                    onClick={(e) => setSelectedItem(workout)}
                    className={`${
                      selectedItem === workout
                        ? "text-emeraldMist font-semibold"
                        : "text-gray-500 "
                    }`}
                  >
                    {workout.name}
                  </li>
                ))}
                {/* <li
                  className="my-3 text-center font-semibold text-gray-500"
                  onClick={() => navigate("/create/workout")}
                >
                  + Add a new workout
                </li> */}
              </ul>
            </div>
          ) : (
            <div className="h-[150px] overflow-y-auto border rounded-md p-2 mb-4">
              <ul>
                {exercises.map((exercise) => (
                  <li
                    key={exercise._id}
                    value={exercise.name}
                    onClick={(e) => setSelectedItem(exercise)}
                    className={`${
                      selectedItem === exercise
                        ? "text-emeraldMist font-semibold"
                        : "text-gray-500 "
                    }`}
                  >
                    {exercise.name}
                  </li>
                ))}
                {/* <li
                  className="my-3 text-center font-semibold text-gray-500"
                  onClick={() => navigate("/create/exercise")}
                >
                  + Add a new exercise
                </li> */}
              </ul>
            </div>
          )}
          <button type="submit" className="form-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Log;
