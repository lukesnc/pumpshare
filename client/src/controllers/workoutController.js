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
const logWorkout = async ( date, workout, about) =>{
  const res = await fetch("/api/workouts/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, workout, about }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
}

const deleteWorkout = async(workout) =>{

  let id = workout._id;
  const res = await fetch('/api/workouts/' + id , {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      
  });
}
export { createWorkout, logWorkout, deleteWorkout };
