
const createExercise = async (name, attr) =>{
    if (!name || !attr) {
        throw Error('All fields are required');
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

const logExercise = async (id,date,sets,reps,weight, about) =>{
    if (!date || !sets || !reps || !weight || !about) {
        console.log(date);
        throw Error('All fields are required');
    }

    const res = await fetch('/api/exercises/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date,sets,reps,weight, about }),
    });
    
    // data is the response from the server
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }

    return data;
};

export { createExercise, logExercise }