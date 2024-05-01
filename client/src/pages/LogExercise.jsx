import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef, React } from "react";
import { logWorkout } from "../controllers/workoutController";
import { logExercise } from "../controllers/exerciseController";

const LogExercise = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [about, setAbout] = useState("");
  const [workout, setWorkout] = useState("");
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const [values, setValues] = useState([]);
  const [attrValue, setAttrValue] = useState("");
  const [allExercises, setAllExercises] = useState([]);
  const [exerciseAttributes, setExerciseAttributes] = useState([]);
  const [selectedItem, setSelectedItem] = useState("exercise");
  const [selectedWorkout, setSelectedWorkout] = useState([]);

  const workoutRef = useRef(null);
  const exerciseRef = useRef(null);
  const attributeInput = useRef(null);

  const workoutList = useRef(null);
  const exerciseList = useRef(null);

  const storedItem = localStorage.getItem("exercise");
  const exerciseObject = JSON.parse(storedItem);
  useEffect(() => {
    const getExerciseWithAttributes = async () => {
      try {
        const res = await fetch(
          "/api/exercises/attribute/" + exerciseObject._id
        );
        const data = await res.json();
        console.log(data[0].attr);
        setExerciseAttributes(data[0].attr);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    getExerciseWithAttributes();
  }, []);
  const onNextClick = () => {
    console.log(values);
    setCurrentInputIndex((prevIndex) => prevIndex + 1);
  };

  const renderAttributes = async (exercise) => {
    setExercise(exercise);

    setExerciseAttributes(exercise?.attr || []);
  };
  const addAttributeValue = async (attribute, value) => {
    const newKey = attribute._id;
    const newValue = value;

    // Check if the key already exists in the values array
    const existingIndex = values.findIndex((item) => item[newKey]);

    if (existingIndex !== -1) {
      // If the key exists, update the corresponding value
      setValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex][newKey] = newValue;
        return updatedValues;
      });
    } else {
      // If the key doesn't exist, add a new entry
      setValues((prevValues) => [...prevValues, { [newKey]: newValue }]);
    }

    setAttrValue(value);
  };
  const removeItemWithValue = (arrayOfObjects, valueToRemove) => {
    return arrayOfObjects.filter(
      (obj) => Object.values(obj)[0] !== valueToRemove
    );
  };

  const handleLog = async (e) => {
    e.preventDefault();

    try {
      const newValues = removeItemWithValue(values, "");
      const data = await logExercise(exerciseObject, about, values);
      console.log("Result: ", data);
      //path to be changed once page is made for viewing single Workout
      //navigate("/", { state: { exercise: data } });
      navigate("/profile", { state: { exercise: data } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">Log {exerciseObject.name}</h1>

        <form className="log-form" onSubmit={handleLog}>
          <div className="container">
            <div
              style={{ flexGrow: 1 }}
              ref={exerciseRef}
              className={`content`}
            >
              {currentInputIndex < exerciseAttributes.length && (
                <div ref={attributeInput}>
                  <div>
                    <div className="flex border border-emeraldMist rounded-md shadow-lg p-2 mb-4">
                      <input
                        value={exerciseAttributes[currentInputIndex].name}
                        type="text"
                        readOnly
                        placeholder="Attribute Name"
                        className="input w-[60%] text-[14px] mr-2"
                      />
                      <input
                        value={exerciseAttributes[currentInputIndex].number}
                        type="number"
                        onChange={(e) =>
                          addAttributeValue(
                            exerciseAttributes[currentInputIndex],
                            e.target.value
                          )
                        }
                        placeholder="Attribute Value"
                        className="input w-[60%] text-[14px] mr-2"
                      />
                      <input
                        value={exerciseAttributes[currentInputIndex].short}
                        readOnly
                        type="text"
                        placeholder="Unit"
                        className="input w-[25%] mb-1 mx-auto text-[14px]"
                      />
                    </div>
                  </div>
                </div>
              )}
              {currentInputIndex < exerciseAttributes.length - 1 && (
                <button className="form-btn" onClick={onNextClick}>
                  Next
                </button>
              )}
              {currentInputIndex >= exerciseAttributes.length - 1 && (
                <div>
                  <label htmlFor="about" className="input-label">
                    About Exercise
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
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogExercise;
