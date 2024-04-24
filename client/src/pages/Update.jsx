import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getExercise, logExercise } from "../controllers/exerciseController";

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const exercise = { exercise: location.state?.exercise };

  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [attr, setAttr] = useState(exercise.exercise.attr || "distance");
  const [date, setDate] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [laps, setLaps] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");
  const [distance, setDistance] = useState("");
  const [measurement, setMeasurement] = useState(
    exercise.exercise.measurement || "miles"
  );
  const [timeUnit, setTimeUnit] = useState(
    exercise.exercise.timeUnit || "minutes"
  );

  const localDate = new Date(exercise.exercise.date).toLocaleDateString();
  const dateParts = localDate.split("/");
  const exerciseDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]); // create a new Date object with the correct format
  const formattedDate = exerciseDate.toISOString().split("T")[0];

  let exerciseAttr = exercise.exercise.attr;

  const renderAttrChange = (attrValue) => {
    const container = document.getElementById("container");
    const distance = document.getElementById("distanceInput");
    const sets = document.getElementById("setsInput");
    const reps = document.getElementById("repsInput");
    const laps = document.getElementById("lapsInput");
    const time = document.getElementById("timeInput");
    const weight = document.getElementById("weightInput");
    const select = document.getElementById("attr");
    console.log(attrValue);

    switch (attrValue) {
      case "distance":
        select.selectedIndex = "0";
        distance.classList.add("visible");
        container.classList.add("distance");
        sets.classList.add("invisible");
        reps.classList.add("invisible");
        laps.classList.add("invisible");
        time.classList.add("invisible");
        weight.classList.add("invisible");
        distance.classList.remove("invisible");
        break;
      case "laps":
        sets.classList.add("invisible");
        reps.classList.add("invisible");
        laps.classList.remove("invisible");
        laps.classList.add("visible");
        container.classList.remove("distance");
        time.classList.add("invisible");
        weight.classList.add("invisible");
        distance.classList.add("invisible");
        break;
      case "sets":
        select.selectedIndex = "2";
        sets.classList.add("visible");
        sets.classList.remove("invisible");
        container.classList.remove("distance");
        reps.classList.add("invisible");
        laps.classList.add("invisible");
        time.classList.add("invisible");
        weight.classList.add("invisible");
        distance.classList.add("invisible");
        break;
      case "time":
        select.selectedIndex = "3";
        sets.classList.add("invisible");
        reps.classList.add("invisible");
        laps.classList.add("invisible");
        container.classList.add("distance");
        time.classList.remove("invisible");
        time.classList.add("visible");
        weight.classList.add("invisible");
        distance.classList.add("invisible");
        break;
      case "repetitions":
        select.selectedIndex = "4";
        reps.classList.add("visible");
        sets.classList.add("invisible");
        reps.classList.remove("invisible");
        container.classList.remove("distance");
        laps.classList.add("invisible");
        time.classList.add("invisible");
        weight.classList.add("invisible");
        distance.classList.add("invisible");
        break;
      case "weight":
        select.selectedIndex = "5";
        weight.classList.add("visible");
        sets.classList.add("invisible");
        reps.classList.add("invisible");
        laps.classList.add("invisible");
        time.classList.add("invisible");
        container.classList.remove("distance");
        weight.classList.remove("invisible");
        distance.classList.add("invisible");
        break;
      default:
        return null;
    }
  };

  const handleExerciseAttrChange = (e) => {
    console.log(e.target.value);
    exerciseAttr = e.target.value;
    setAttr(e.target.value);
    renderAttrChange(e.target.value); // Pass the new attribute value to renderAttrChange
  };
  const handleLog = async (e) => {
    e.preventDefault();

    try {
      const data = await logExercise(
        exercise.exercise._id,
        name,
        attr,
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
      navigate("/view", { state: { exercise: data } });
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    renderAttrChange(exerciseAttr);
  }, []); // Empty dependency array ensures the effect runs only once after mounting

  // Define your method here

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">{exercise.exercise.name}</h1>

        <form className="log-form" onSubmit={handleLog}>
          <label htmlFor="sets">Exercise Name</label>
          <input
            defaultValue={exercise.exercise.name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="input"
          />

          <label htmlFor="attr">Choose exercise attributes:</label>
          <select
            
            name="attr"
            id="attr"
            className="input"
            onChange={handleExerciseAttrChange}
          >
            <option value="distance">Distance</option>
            <option value="laps">Laps</option>
            <option value="sets">Sets</option>
            <option value="time">Time</option>
            <option value="repetitions">Repetitions</option>
            <option value="weight">Weight</option>
          </select>

          <label htmlFor="date" className="input-label">
            Date
          </label>
          <input
            defaultValue={formattedDate}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
            id="date"
            className="input"
          />

          <div id="container" className="container">
            <div id="distanceInput" className="invisible content">
              <label htmlFor="distance" className="input-label">
                Distance
              </label>
              <input
                defaultValue={exercise.exercise.distance}
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
            </div>

            <div id="setsInput" className="invisible content">
              <label htmlFor="sets" className="input-label">
                Sets
              </label>
              <input
                defaultValue={exercise.exercise.sets}
                onChange={(e) => setSets(e.target.value)}
                type="text"
                name="sets"
                id="sets"
                className="input"
              />
            </div>

            <div id="timeInput" className="invisible content">
              <label htmlFor="time" className="input-label">
                Time
              </label>
              <input
                defaultValue={exercise.exercise.time}
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
            </div>

            <div id="lapsInput" className="invisible content">
              <label htmlFor="laps" className="input-label">
                Laps
              </label>
              <input
                defaultValue={exercise.exercise.laps}
                onChange={(e) => setLaps(e.target.value)}
                type="text"
                name="laps"
                id="laps"
                className="input"
              />
            </div>

            <div id="repsInput" className="invisible content">
              <label htmlFor="reps" className="input-label">
                Reps
              </label>
              <input
                defaultValue={exercise.exercise.laps}
                onChange={(e) => setReps(e.target.value)}
                type="text"
                name="reps"
                id="reps"
                className="input"
              />
            </div>

            <div id="weightInput" className="invisible">
              <label htmlFor="weight" className="input-label">
                Weight
              </label>
              <input
                defaultValue={exercise.exercise.weight}
                onChange={(e) => setWeight(e.target.value)}
                type="text"
                name="weight"
                id="weight"
                className="input"
              />
            </div>
          </div>
          <label htmlFor="about" className="input-label">
            About
          </label>
          <textarea
            defaultValue={exercise.exercise.about}
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

export default Update;
