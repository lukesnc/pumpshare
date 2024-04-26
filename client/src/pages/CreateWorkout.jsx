import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateWorkout = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const navigate = useNavigate();

  const workoutFormString = localStorage.getItem("workoutFormState") || null;
  const workoutFormState = workoutFormString
    ? JSON.parse(workoutFormString)
    : null;

  useEffect(() => {
    if (workoutFormState) {
      setName(workoutFormState.name);
      setSelectedExercises(workoutFormState.exercises);
    }
  }, []);

  useEffect(() => {
    const fetchAttrData = async () => {
      try {
        const res = await fetch("/api/exercises");
        const data = await res.json();
        setAllExercises(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchAttrData();
  }, []);

  useEffect(() => {
    const formInfo = {
      name,
      exercises: selectedExercises,
    };
    const formState = JSON.stringify(formInfo);
    localStorage.setItem("workoutFormState", formState);
  }, [name, selectedExercises]);

  const addToSelectedExercise = (e) => {
    if (selectedExercises.includes(e)) {
      removeSelectedExercise(e);
      return;
    }
    const newExercises = [...selectedExercises, e];
    setSelectedExercises(newExercises);
  };

  const removeSelectedExercise = (e) => {
    const index = selectedExercises.findIndex(
      (exercise) => exercise.name === e.name
    );

    if (index !== -1) {
      const newExercises = [
        ...selectedExercises.slice(0, index),
        ...selectedExercises.slice(index + 1),
      ];
      setSelectedExercises(newExercises);
    }
  };

  const handleNewExercise = async () => {};

  const handleCreate = async (e) => {
    e.preventDefault();
    localStorage.removeItem("workoutFormState");
    try {
      const data = await createWorkout(name, attr);
      // navigate("/log", { state: { exercise: data } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
          <h2 className="form-title">New Workout</h2>

          <form className="log-form" onSubmit={handleCreate}>
            <label htmlFor="sets">Workout Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="input mb-4"
            />
            <div>
              <span className="">Exercises</span>
              <ul className="h-20 overflow-y-auto">
                {selectedExercises.map((exercise, index) => (
                  <li
                    key={index}
                    value={exercise.name}
                    className="text-gray-500"
                  >
                    <i
                      key={index + exercise._id}
                      value={exercise.name}
                      className="fa-solid fa-xmark text-red-500 mr-2 "
                      onClick={(e) => {
                        removeSelectedExercise(exercise);
                      }}
                    ></i>
                    <span>{exercise.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <label className="mt-4 mb-2">
              Choose exercises for this workout:
            </label>
            <div className="h-[150px] overflow-y-auto border rounded-md p-2 mb-4">
              <ul>
                {allExercises.map((exercise) => (
                  <li
                    key={exercise._id}
                    value={exercise.name}
                    onClick={(e) => addToSelectedExercise(exercise)}
                    className={`${
                      (workoutFormState?.exercises || []).some(
                        (ex) => ex._id === exercise._id
                      ) || selectedExercises.includes(exercise)
                        ? "text-emeraldMist font-semibold"
                        : "text-gray-500 "
                    }`}
                  >
                    {exercise.name}
                  </li>
                ))}
                <li
                  className="my-3 text-center font-semibold text-gray-500"
                  onClick={() => navigate("/create/exercise")}
                >
                  + Add a new exercise
                </li>
              </ul>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateWorkout;
