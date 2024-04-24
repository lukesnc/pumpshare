import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logExercise } from "../controllers/exerciseController";


const Log = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const exercise = { exercise: location.state?.exercise };
  const attr = exercise.exercise.attr;

  
  
  const [error, setError] = useState(null);
  const [measurement, setMeasurement] = useState(exercise.exercise.measurement || 'miles');
  const [timeUnit, setTimeUnit] = useState(exercise.exercise.timeUnit || 'minutes');
  const [date, setDate] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [laps, setLaps] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");

  const exerciseId = { logId: location.state?.logId };
  const [distance, setDistance] = useState("");
  
  


  const handleLog = async (e) => {
    e.preventDefault();

    try {
      
      const data = await logExercise(
        exercise.exercise._id,
        "",
        "",
        date,
        distance,
        sets,
        time,
        laps,
        reps,
        weight,
        about,
        measurement,
        timeUnit
      );
      console.log(data);
      //path to be changed once page is made for viewing single exercise
      navigate("/", { state: { exercise: data } });
      navigate("/view", { state: { exercise: data } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">{exercise.exercise.name}</h1>

        <form className="log-form" onSubmit={handleLog}>
          <label htmlFor="date" className="input-label">
            Date
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
            id="date"
            className="input"
          />

          {attr == "distance" && (
            <>
              <label htmlFor="distance" className="input-label">
                Distance
              </label>
              <input
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                type="text"
                name="distance"
                id="distance"
                className="input"
              />
              <label htmlFor="measurement">Unit:</label>
              <select
                name="measurement"
                id="measurement"
                className="input"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
              >
                <option value="miles">Miles</option>
                <option value="kilometers">Kilometers</option>
              </select>
            </>
          )}

          {attr == "sets" && (
            <>
              <label htmlFor="sets" className="input-label">
                Sets
              </label>
              <input
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                type="text"
                name="sets"
                id="sets"
                className="input"
              />
            </>
          )}

          {attr == "time" && (
            <>
              <label htmlFor="time" className="input-label">
                Time
              </label>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="text"
                name="time"
                id="time"
                className="input"
              />
              <label htmlFor="timeUnit">Unit:</label>
              <select
                name="timeUnit"
                id="timeUnit"
                className="input"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </>
          )}

          {attr == "laps" && (
            <>
              <label htmlFor="laps" className="input-label">
                Laps
              </label>
              <input
                value={laps}
                onChange={(e) => setLaps(e.target.value)}
                type="text"
                name="laps"
                id="laps"
                className="input"
              />
            </>
          )}

          {attr == "repetitions" && (
            <>
              <label htmlFor="reps" className="input-label">
                Reps
              </label>
              <input
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                type="text"
                name="reps"
                id="reps"
                className="input"
              />
            </>
          )}

          {attr == "weight" && (
            <>
              <label htmlFor="weight" className="input-label">
                Weight
              </label>
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="text"
                name="weight"
                id="weight"
                className="input"
              />
            </>
          )}

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

export default Log;
