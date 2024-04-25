import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const handleCreate = async (e) => {
  e.preventDefault();

  try {
    const data = await createExercise(name, attr);
    //path to be changed once page is made for viewing single exercise
    navigate("/log", { state: { exercise: data } });
  } catch (error) {
    setError(error.message);
  }
};

function CreateWorkout() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
          <h2 className="form-title">New Workout</h2>

          <form className="log-form" onSubmit={handleCreate}>
            <label htmlFor="sets">Workout Name</label>
            <input
              value={name}
              type="text"
              name="name"
              id="name"
              className="input"
            />

            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateWorkout;
