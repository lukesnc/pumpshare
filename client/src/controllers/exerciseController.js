const createExercise = async (name, attr) => {
  if (!name || !attr) {
    throw Error("All fields are required");
  }

    const res = await fetch('/api/exercises/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, attr }),
    });
    
    // data is the response from the server
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }
    return data; 
};

const getExercise = async (id) =>{
    console.log(id.logId);
    const res = await fetch('/api/exercises/' + id.logId , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        
    });
    const data = await res.json();
    
    return data;
};

const logExercise = async (date,exercise,about, values) =>{

    const res = await fetch('/api/exercises/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({date, exercise, about, values }),
    });
    
    // data is the response from the server
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }

  return data;
};

const deleteExercise = async(exercise) =>{

    let id = exercise.exercise._id;
    const res = await fetch('/api/exercises/' + id , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        
    });
}
export { createExercise, logExercise, getExercise, deleteExercise }