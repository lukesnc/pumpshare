import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createExercise } from "../controllers/exerciseController";

const Create = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [attr, setAttr] = useState("distance");
  
  
  
  

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const data = await createExercise(name, attr);
      //path to be changed once page is made for viewing single exercise
      navigate('/log', { state: { exercise: data } });
      

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">Create an exercise</h2>

        <form className="log-form" onSubmit={handleCreate}>
          <label htmlFor="sets">Exercise Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="input"
          />

            <label htmlFor="attr">Choose exercise attributes:</label>
            <select name="attr" id="attr" className="input"  value={attr} onChange={(e) => setAttr(e.target.value)}>
              <option value="distance">Distance</option>
              <option value="laps">Laps</option>
              <option value="sets">Sets</option>
              <option value="time">Time</option>
              <option value="repetitions">Repetitions</option>
              <option value="weight">Weight</option>
            </select>

          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
