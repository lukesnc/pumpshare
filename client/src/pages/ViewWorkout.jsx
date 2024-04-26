import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../style";
import { deleteWorkout } from "../controllers/workoutController";

const ViewWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const workout = { workout: location.state?.workout }.workout.workout;
  const exercises = {};


  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    
    e.preventDefault();

    try {
      const data = workout;
      //path to be changed once page is made for viewing single exercise
      navigate('/update/workout', { state: { workout: data } });
      

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleDelete = async (e) => {
    
    e.preventDefault();

    try {
      const data = await deleteWorkout(workout);
      //path to be changed once page is made for viewing single exercise
      navigate('/');
      

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className={`${styles.heading1}`}>{workout.name}</h1>
        <p>{workout.date}</p>
        
        <div>
        <span className="">Exercises</span>
              <ul className="h-20 overflow-y-auto">
                {workout.exercises.map((exercise, index) => (
                  <li
                    key={index}
                    value={exercise.name}
                    className="text-gray-500"
                  >
                    
                    <span>{exercise.name}</span>
                  </li>
                ))}
              </ul>
        </div>
        <p>About</p>
        <p>{workout.about}</p>

        <div>
          <button className="form-btn-outline" onClick={handleUpdate}>Update</button>
          <button className="form-btn-outline" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewWorkout;
