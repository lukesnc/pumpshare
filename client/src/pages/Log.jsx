const Log = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">Log Exercise</h1>

        <form className="log-form">
          <label htmlFor="date" className="input-label">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            className="input"
          />

          <label htmlFor="sets" className="input-label">Sets</label>
          <input
            type="text"
            name="sets"
            id="sets"
            className="input"
          />

          <label htmlFor="reps" className="input-label">Reps</label>
          <input
            type="text"
            name="reps"
            id="reps"
            className="input"
          />

          <label htmlFor="weight" className="input-label">Weight</label>
          <input
            type="text"
            name="weight"
            id="weight"
            className="input"
          />

          <label htmlFor="about" className="input-label">About</label>
          <textarea
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
