import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef, React } from "react";

const LogExercise = () => {
  const navigate = useNavigate();
  const { logType, id } = useParams();
  const [error, setError] = useState(null);
  const [logObject, setLogObject] = useState({});
  const today = new Date().toISOString().substring(0, 10); // YYYY-MM-DD format
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(getTime());

  function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Add leading zero for single-digit minutes
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await fetch(`/api/${logType}s/template/${id}/`);
      const data = await res.json();
      const logTemplate = data;
      logTemplate.date = date;
      logTemplate.time = time;
      setLogObject(logTemplate);
    };
    fetchTemplate();
  }, [logType, id]);

  const handleDateChange = (newDate) => {
    const updatedLogObject = { ...logObject };
    setDate(newDate);
    updatedLogObject.date = newDate;
    setLogObject(updatedLogObject);
  };

  const handleTimeChange = (newTime) => {
    const updatedLogObject = { ...logObject };
    setTime(newTime);
    updatedLogObject.time = newTime;
    setLogObject(updatedLogObject);
  };

  const handleInputChange = (e, attributeIndex, exerciseIndex, notes) => {
    const updatedLogObject = { ...logObject };
    if (e != null || attributeIndex != null || exerciseIndex != null) {
      exerciseIndex >= 0
        ? (updatedLogObject.exercises[exerciseIndex].attributes[
            attributeIndex
          ].amount = e.target.value)
        : (updatedLogObject.attributes[attributeIndex].amount = e.target.value);
    }
    if (notes != null) updatedLogObject.notes = notes;

    setLogObject(updatedLogObject);
  };

  const handleLog = async (e) => {
    e.preventDefault();
    console.log(logObject);
    try {
      const res = await fetch(`/api/${logType}s/log/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logObject }),
      });
      if (res.ok) {
        navigate("/dashboard");
      } else {
        setError("Something went wrong.");
      }
    } catch (error) {
      setError(`There was an error saving the ${logType} data`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h1 className="form-title">Log - {logObject.name}</h1>

        <form className="log-form" onSubmit={handleLog}>
          <div className="container">
            <div className="flex mb-8">
              <div className="mr-auto">
                <label className="input-label my-auto">Date</label>
                <input
                  type="date"
                  className="input border-gray-300 mb-4 pr-2"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
              <div className="">
                <label className="input-label my-auto">Time</label>
                <input
                  type="time"
                  className="input border-gray-300 pr-2"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                />
              </div>
            </div>
            {logType === "exercise" && logObject.attributes
              ? logObject.attributes.map((attr, attributeIndex) => (
                  <div key={attr.attributeId} className="flex gap-4">
                    <input
                      type="number"
                      id={attr.attributeId}
                      name={attr.short}
                      className="input w-20 mb-4"
                      value={attr.amount}
                      onChange={(e) => handleInputChange(e, attributeIndex)}
                    />
                    <label className="input-label my-auto">{attr.short}</label>
                  </div>
                ))
              : logObject.exercises &&
                logObject.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex}>
                    <h2
                      key={exerciseIndex}
                      className="text-xl font-semibold text-emeraldMist border-t border-emeraldMist text-end"
                    >
                      {exercise.name}
                    </h2>
                    {exercise.attributes.map((attribute, attributeIndex) => (
                      <div key={attributeIndex} className="flex gap-4">
                        <input
                          key={attribute.attributeId}
                          type="number"
                          id={attribute.attributeId}
                          name={attribute.short}
                          className="input w-20 mb-4"
                          value={attribute.amount}
                          onChange={(e) =>
                            handleInputChange(e, attributeIndex, exerciseIndex)
                          }
                        />
                        <label
                          key={attribute.attributeId + attributeIndex}
                          className="input-label my-auto"
                        >
                          {attribute.short}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
            <div className="">
              <label htmlFor="about" className="input-label mt-6 text-center">
                Notes about this {logObject.type}:
              </label>
              <textarea
                value={logObject.notes}
                onChange={(e) =>
                  handleInputChange(null, null, null, e.target.value)
                }
                name="about"
                id="about"
                cols="30"
                rows="6"
                className="input h-20"
              ></textarea>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="form-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogExercise;
