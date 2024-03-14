const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true, minlength: 3 },
    password: { type: String, required: [true, 'Password is required'], trim: true, minlength: 8 }
}, { timestamps: true });

// userSchema.methods.comparePassword = function(inputPassword) {
//     let user = this;
//     // return (inputPassword === user.password);
//     return true;
//   }

  userSchema.methods.comparePassword = function(inputPassword) {
    return new Promise((resolve, reject) => {
        let user = this;
        if (inputPassword === user.password) {
            resolve(true); // Passwords match
        } else {
            resolve(false); // Passwords do not match
        }
    });
}


module.exports = mongoose.model('User', userSchema, 'users'); // The third argument is the name of the collection in the database (if it is not provided, it will be the lowercase-plural of the first argument)