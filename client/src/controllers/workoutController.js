const createWorkout = async (name, exercises) => {
  if (!name || !exercises) {
    throw Error("All fields are required");
  }

  const res = await fetch("/api/workouts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, exercises }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

export { createWorkout };
