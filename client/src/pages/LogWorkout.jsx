import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef, React } from "react";
import { logWorkout } from "../controllers/workoutController";
import { logExercise } from "../controllers/exerciseController";

const LogWorkout = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [about, setAbout] = useState("");
  const [workout, setWorkout] = useState("");
  const [exercise, setExercise] = useState("");

  const [values, setValues] = useState([]);
  const [attrValue, setAttrValue] = useState("");
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [exerciseAttributes, setExerciseAttributes] = useState([]);
  const [selectedItem, setSelectedItem] = useState("exercise");
  const [selectedWorkout, setSelectedWorkout] = useState([]);

  const workoutRef = useRef(null);
  const exerciseRef = useRef(null);
  const attributeInput = useRef(null);

  const workoutList = useRef(null);
  const exerciseList = useRef(null);

  const logFormString = localStorage.getItem("logFormState") || null;
  const logFormState = logFormString ? JSON.parse(logFormString) : null;

  const renderAttributes = async (exercise) => {
    setExercise(exercise);

    setExerciseAttributes(exercise?.attr || []);
  };
  const addAttributeValue = async (attribute, value) => {
    const newKey = attribute._id;
    const newValue = value;
    setValues([...values, newValue]);
    setAttrValue(value);
  };

  const handleLog = async (e) => {
    e.preventDefault();

    try {
      const data = await logExercise(date, exercise, about, values);
      console.log("Result: ", data);
      //path to be changed once page is made for viewing single Workout
      navigate("/", { state: { exercise: data } });
      navigate("/view/exercise", { state: { exercise: data } });
    } catch (error) {
      setError(error.message);
    }

    try {
      const data = await logWorkout(date, workout, about);
      console.log("Result: ", data);
      //path to be changed once page is made for viewing single Workout
      navigate("/", { state: { workout: data } });
      navigate("/view/workout", { state: { workout: data } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">Log</h1>

        
         
        <form className="log-form" onSubmit={handleLog}>
          <div className="container">
           
              <div
                style={{ flexGrow: 1 }}
                ref={exerciseRef}
                className={`content`}
              >
                <span className="">Exercise</span>
                <input
                  value={exercise.name}
                  readOnly
                  type="text"
                  name="name"
                  id="name"
                  className="input mb-4"
                  placeholder="Exercise Name"
                />
                <div ref={attributeInput}>
                  
                    <div key={index}>
                      <div className="flex border border-emeraldMist rounded-md shadow-lg p-2 mb-4">
                        <input
                          value={attr.name}
                          type="text"
                          readOnly
                          placeholder="Attribute Name"
                          className="input w-[60%] text-[14px] mr-2"
                        />
                        <input
                          value={values[index]}
                          type="Number"
                          onChange={(e) =>
                            addAttributeValue(attr, e.target.value)
                          }
                          placeholder="Attribute Value"
                          className="input w-[60%] text-[14px] mr-2"
                        />
                        <input
                          value={attr.short}
                          readOnly
                          type="text"
                          placeholder="Unit"
                          className="input w-[25%] mb-1 mx-auto text-[14px]"
                        />
                      </div>
                    </div>
                  
                </div>

                <label className="mt-4 mb-2">
                  Choose which exercise to log:
                </label>
                <div className="h-[150px] overflow-y-auto border rounded-md p-2 mb-4">
                  <ul>
                    {allExercises.map((exercise) => (
                      <li
                        key={exercise._id}
                        value={exercise.name}
                        onClick={(e) => renderAttributes(exercise)}
                        /*className={`${
                    (logFormState?.workouts || []).some(
                      (ex) => ex._id === workout._id
                    ) || selectedworkouts.includes(workout)
                      ? "text-emeraldMist font-semibold"
                      : "text-gray-500 "
                  }`}*/
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
              </div>
            </div>
            
              
              
            
          
          <label htmlFor="about" className="input-label">
            About
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            name="about"
            id="about"
            cols="30"
            rows="6"
            className="input"
          ></textarea>

          <button type="submit" className="form-btn">
            Submit
          </button>
          
        </form>
        
      </div>
      
    </div>
  );
};

export default LogWorkout;