const Exercise = require('../models/exercise');



exports.createExercise = async (req,res) =>{
    const {name, attr} = req.body;
    if (!name || !attr){
        return res.status(400).json({error: 'All fields are required'});
    }

    const exercise = new Exercise({name, attr});
    exercise.save()
    .then(()=>{
        res.status(200).json(exercise);
    })
    .catch(error => res.status(400).json({error: error.message}));    
}

exports.logExercise = async (req,res) =>{
    const { id } = req.params;
    
    const {date, sets, reps, weight,about} = req.body;
    if (!date || !sets || !reps || !weight || !about){
        return res.status(400).json({error: 'All fields are required'});
    }
    Exercise.findOneAndUpdate(
        id,
        {
            date:date,
            sets:sets,
            reps:reps,
            weight:weight,
            about:about
        }
    )
    .then((exercise) =>{
        res.status(200).json({exercise});
        //res.redirect(`/:${exercise._id}`);
    })
    .catch(error => res.status(500).json({error: error.message}));
    

    
}
