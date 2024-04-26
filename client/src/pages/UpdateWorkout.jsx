import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { logWorkout } from "../controllers/workoutController";

const UpdateWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ogWorkout = { workout: location.state?.workout }.workout;

  const parsedDate = ogWorkout.date.toString();
  const reformattedDate = parsedDate.substring(0,10);
  console.log(reformattedDate);
  
 
  console.log(ogWorkout);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(ogWorkout.date);
  const [about, setAbout] = useState(ogWorkout.about);
  const [workout, setWorkout] = useState(ogWorkout.name);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState([]);

  

  const logFormString = localStorage.getItem("logFormState") || null;
  const logFormState = logFormString
    ? JSON.parse(logFormString)
    : null;

    

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await fetch("/api/workouts");
        const data = await res.json();
        console.log("data: ", data);
        setAllWorkouts(data);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    getWorkouts();
  }, []);

  useEffect(() => {
    const formInfo = {
      date:date,
      workout: selectedWorkout,
      about:about
    };
    const formState = JSON.stringify(formInfo);
    localStorage.setItem("logFormState", formState);
  }, [date, selectedWorkout, about]);

  const handleLog = async (e) => {
    e.preventDefault();

    try {
      const data = await logWorkout(date, ogWorkout, about);
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
        <h1 className="form-title">Log Workout</h1>

        <form className="log-form" onSubmit={handleLog}>
          <label htmlFor="date" className="input-label">
            Date
          </label>
          <input
            value={date}
            defaultValue={reformattedDate}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
            id="date"
            className="input"
          />
          
          <span className="">Workout</span>
          <input value={workout}
              defaultValue={ogWorkout.name}
              readOnly
              type="text"
              name="name"
              id="name"
              className="input mb-4"
            />
              
          <label className="mt-4 mb-2">Choose which workouts to log:</label>
          <div className="h-[150px] overflow-y-auto border rounded-md p-2 mb-4">
            <ul>
              {allWorkouts.map((workout) => (
                <li
                  key={workout._id}
                  value={workout.name}
                  onClick={(e) => setWorkout(workout)}
                  /*className={`${
                    (logFormState?.workouts || []).some(
                      (ex) => ex._id === workout._id
                    ) || selectedworkouts.includes(workout)
                      ? "text-emeraldMist font-semibold"
                      : "text-gray-500 "
                  }`}*/
                >
                  {workout.name}
                </li>
              ))}
              <li
                className="my-3 text-center font-semibold text-gray-500"
                onClick={() => navigate("/create/workout")}
              >
                + Add a new workout
              </li>
            </ul>
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

export default UpdateWorkout;
