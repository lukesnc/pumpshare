import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { logExercise } from "../controllers/exerciseController";


const Log = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [date, setDate] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");

  const exerciseId = { logId: location.state?.logId };
  

  const handleLog = async (e) => {
    
    e.preventDefault();

    try {
      const data = await logExercise(exerciseId.logId, date, sets, reps, weight, about);
      console.log(data);
      //path to be changed once page is made for viewing single exercise
      navigate('/', { state: { exercise: data } });
      

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">Log Exercise</h1>

        <form className="log-form" onSubmit={handleLog}>
          <label htmlFor="date" className="input-label">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
            id="date"
            className="input"
          />

          <label htmlFor="sets" className="input-label">Sets</label>
          <input
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            type="text"
            name="sets"
            id="sets"
            className="input"
          />

          <label htmlFor="reps" className="input-label">Reps</label>
          <input
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            type="text"
            name="reps"
            id="reps"
            className="input"
          />

          <label htmlFor="weight" className="input-label">Weight</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="text"
            name="weight"
            id="weight"
            className="input"
          />

          <label htmlFor="about" className="input-label">About</label>
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

export default Log;
