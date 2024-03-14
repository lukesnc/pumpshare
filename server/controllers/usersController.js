const User = require('../models/user');

exports.registerUser = (req, res) => {
    res.send('registerUser');
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'All fields are required'});
    }

    User.findOne({ email: email.toLowerCase() })
    .then(user => {
        if (!user) {
            return res.status(400).json({error: 'Invalid credentials'});
        } else {
            return user.comparePassword(password) 
            .then(match => {
                if (!match) {
                    return res.status(400).json({error: 'Invalid credentials'});
                } else {
                    // Send the response
                    // email is the only thing we are sending for now, but we can send more information if we want to
                    // This is sent to frontend as 'data' and can be used to update the state or save to local storage
                    res.status(200).json({email})
                }
            })
            .catch(error => res.status(500).json({error: error.message}));
        }
    })
    .catch(error => res.status(500).json({error: error.message}));
}