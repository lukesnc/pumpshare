import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createExercise } from "../controllers/exerciseController";

const CreateExercise = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);
  // const [exerciseObject, setExerciseObject] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [createAttr, setCreateAttr] = useState(false);
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrUnits, setNewAttrUnits] = useState("");

  // Determine if navigating from the workout form and obtain info
  const workoutState = location.state?.workoutState || null;
  const usingLocation = location.state?.workoutState.navigating || false;

  useEffect(() => {
    const fetchAttrData = async () => {
      try {
        const res = await fetch("/api/exercises/attributes");
        const data = await res.json();
        setAttributes(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchAttrData();
  }, []);

  const addToSelectedAttr = (e) => {
    if (selectedAttributes.includes(e)) {
      removeSelectedAttr(e);
      return;
    }
    setSelectedAttributes([...selectedAttributes, e]);
    setCreateAttr(false);
  };

  const removeSelectedAttr = (e) => {
    const index = selectedAttributes.findIndex((attr) => attr.name === e.name);

    if (index !== -1) {
      const newAttributes = [
        ...selectedAttributes.slice(0, index),
        ...selectedAttributes.slice(index + 1),
      ];
      setSelectedAttributes(newAttributes);
    }
  };

  const handleCreateAttr = async (name, units) => {
    if (!name || !units) {
      setError("Attribute name and unit of measurement needed");
      return;
    }
    setError(null);
    setCreateAttr(false);
    try {
      const res = await fetch("/api/exercises/attributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, units }),
      });
      const data = await res.json();
      setAttributes([...attributes, data]);
      setSelectedAttributes([...selectedAttributes, data]);
      setNewAttrName("");
      setNewAttrUnits("");
    } catch (error) {
      console.error("Error creating a new attribute", error);
    }
  };

  const handleCreateExercise = async (e) => {
    e.preventDefault();
    try {
      const data = await createExercise(name, attributes);
      const exerciseObject = {
        id: data._id,
        name: data.name,
      };
      if (!usingLocation) {
        navigate("/log"); // POSSIBLE CHANGE
        // navigate("/log", { state: { exercise: data } }); // POSSIBLE CHANGE
      } else {
        const updatedExercises = [...workoutState.exercises, exerciseObject];
        const newWorkoutState = {
          name: `${workoutState.name}`,
          exercises: updatedExercises,
          navigating: true,
        };
        console.log("newWorkoutState: ", newWorkoutState);
        navigate("/create/workout", {
          state: { workoutState: newWorkoutState },
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
          {usingLocation ? (
            <h2 className="form-title">
              Add an exercise to{" "}
              {workoutState.name ? workoutState.name : "your workout"}
            </h2>
          ) : (
            <h2 className="form-title">New Exercise</h2>
          )}

          <form className="log-form" onSubmit={handleCreateExercise}>
            <label htmlFor="sets">Exercise Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="input mb-4"
            />
            <div>
              <span className="">Attributes</span>
              <ul className="h-20 overflow-y-auto">
                {selectedAttributes.map((attr, index) => (
                  <li key={index} value={attr.name} className="text-gray-500">
                    <i
                      key={index + attr._id}
                      value={attr.name}
                      className="fa-solid fa-xmark text-red-500 mr-2 "
                      onClick={(e) => {
                        removeSelectedAttr(attr);
                      }}
                    ></i>
                    <span>{attr.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <label htmlFor="attr" className="mt-4 mb-2">
              Choose exercise attributes:
            </label>
            <div className="h-[150px] overflow-y-auto border rounded-md p-2 mb-4">
              <ul>
                {attributes.map((attr) => (
                  <li
                    key={attr._id}
                    value={attr.name}
                    onClick={(e) => addToSelectedAttr(attr)}
                    className={`${
                      selectedAttributes.includes(attr)
                        ? "text-emeraldMist font-semibold"
                        : "text-gray-500 "
                    }`}
                  >
                    {attr.name}
                    <span className="text-gray-400 ml-2 text-[12px]">
                      <i className="fa-solid fa-arrow-right-long mr-1"></i>
                      {attr.short}
                    </span>
                  </li>
                ))}
                <li
                  className="my-3 text-center font-semibold text-gray-500"
                  onClick={() => {
                    setCreateAttr(true), setError(null);
                  }}
                >
                  + Add a new attribute
                </li>
              </ul>
            </div>
            {createAttr && (
              <div className="flex border border-emeraldMist rounded-md shadow-lg p-2 mb-4">
                <i
                  className="fa-solid fa-circle-minus fa-lg text-red-600 my-auto mr-3"
                  onClick={() => {
                    setCreateAttr(false), setError(null);
                  }}
                ></i>
                <input
                  value={newAttrName}
                  onChange={(e) => setNewAttrName(e.target.value)}
                  type="text"
                  placeholder="Attribute Name"
                  className="input w-[60%] text-[14px] mr-2"
                />
                <input
                  value={newAttrUnits}
                  onChange={(e) => setNewAttrUnits(e.target.value)}
                  type="text"
                  placeholder="lbs"
                  className="input w-[25%] mb-1 mx-auto text-[14px]"
                />
                <i
                  className="fa-solid fa-plus text-emeraldMist fa-xl my-auto ml-3"
                  onClick={() => handleCreateAttr(newAttrName, newAttrUnits)}
                ></i>
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="form-btn">
              {usingLocation ? " Add Exercise" : "Submit"}
            </button>
            {usingLocation && (
              <button
                type="button"
                className="form-btn bg-red-600"
                onClick={() => {
                  navigate("/create/workout", {
                    state: { workoutState },
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateExercise;
