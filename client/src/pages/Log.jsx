import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Log = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedType, setSelectedType] = useState("workout");

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await fetch("/api/workouts");
        const data = await res.json();
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
        const res = await fetch("/api/exercises/");
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    getExercises();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!selectedItem || !selectedType || !selectedItem._id) {
      console.error("Missing data in event object for navigation");
      return;
    }
    navigate(`/log/${selectedType}/${selectedItem._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full pt-3 pb-8 px-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <div className="flex border-b border-gray-200">
          <button
            className={`w-full py-2 text-center ${
              selectedType === "workout"
                ? "border-b-2 border-b-emeraldMist font-semibold text-lg"
                : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedType("workout");
            }}
          >
            Workout
          </button>
          <button
            className={`w-full py-2 text-center ${
              selectedType === "exercise"
                ? "border-b-2 border-b-emeraldMist font-semibold text-lg"
                : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedType("exercise");
            }}
          >
            Exercise
          </button>
        </div>

        <h1 className="my-6 text-xl font-semibold font-merriweather text-center">
          Log {selectedType === "workout" ? "a workout" : "an exercise"}
        </h1>

        <form className="log-form" onSubmit={handleNext}>
          {selectedType === "workout" ? (
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
