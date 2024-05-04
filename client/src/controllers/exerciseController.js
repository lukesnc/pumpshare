const createExercise = async (name, attr) => {
  if (!name || !attr) {
    throw Error("All fields are required");
  }

  const res = await fetch("/api/exercises/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, attr }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const getExercise = async (id) => {
  const res = await fetch("/api/exercises/" + id.logId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

const logExercise = async (exercise, about, values) => {
  const res = await fetch("/api/exercises/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ exercise, about, values }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

const deleteExercise = async (exercise) => {
  let id = exercise.exercise._id;
  const res = await fetch("/api/exercises/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getAllExercises = async (req, res) => {
  try {
      const exercises = await Exercise.find({});
      console.log("Exercises fetched:", exercises);  // Check the console for this output
      res.json(exercises);  // This should send the exercise data
  } catch (error) {
      res.status(500).json({ message: "Error retrieving exercises", error: error.toString() });
  }
};
export { createExercise, logExercise, getExercise, deleteExercise, getAllExercises};


