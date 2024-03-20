const Create = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        
          <h2 className="form-title">Create an exercise</h2>

          <form className="log-form">
            <label htmlFor="sets">Exercise Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="input"
            />

            <label for="attr">Choose exercise attributes:</label>
            <select name="attr" id="attr" className="input">
              <option value="distance">Distance</option>
              <option value="laps">Laps</option>
              <option value="sets">Sets</option>
              <option value="time">Time</option>
              <option value="repitions">Repititions</option>
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
