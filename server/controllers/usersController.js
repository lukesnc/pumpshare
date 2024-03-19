const User = require('../models/user');
const { posts } = require('./postsController'); // This to be removed - for testing only

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

// This function has errors, but connection has been established
exports.getProfile = (req, res) => {
    const username = req.params.username;
    console.log('username:', username);

    User.findOne({ username: username })
        .then(user => {
            console.log('userData:', user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

