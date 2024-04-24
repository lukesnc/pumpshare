import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../style";
import { deleteExercise } from "../controllers/exerciseController";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const exercise = { exercise: location.state?.exercise }.exercise;
  const date = new Date(exercise.exercise.date).toLocaleDateString()


  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    
    e.preventDefault();

    try {
      const data = exercise.exercise;
      //path to be changed once page is made for viewing single exercise
      navigate('/update', { state: { exercise: data } });
      

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleDelete = async (e) => {
    
    e.preventDefault();

    try {
      const data = await deleteExercise(exercise);
      //path to be changed once page is made for viewing single exercise
      navigate('/');
      

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const renderSwitch = (attr) => {
    switch (attr) {
      case "distance":
        return <p>{exercise.exercise.distance}  {exercise.exercise.measurement}</p>;
      case "laps":
        return <p>{exercise.exercise.laps}</p>;
      case "sets":
        return <p>{exercise.exercise.sets}</p>;
      case "time":
        return <p>{exercise.exercise.time}  {exercise.exercise.timeUnit}</p>;
      case "repetitions":
        return <p>{exercise.exercise.reps}</p>;
      case "weight":
        return <p>{exercise.exercise.weight}</p>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className={`${styles.heading1}`}>{exercise.exercise.name}</h1>
        <p>{date}</p>
        <p>{exercise.exercise.attr}</p>
        <div>
          {renderSwitch(exercise.exercise.attr)}
        </div>
        <p>{exercise.exercise.about}</p>

        <div>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default View;
