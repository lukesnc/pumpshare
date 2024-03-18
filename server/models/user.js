const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'First Name is required'], trim: true, minlength: 1 },
    lastName: { type: String, required: [true, 'Last Name is required'], trim: true, minlength: 1 },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true, minlength: 3 },
    password: { type: String, required: [true, 'Password is required'], trim: true, minlength: 8 },
    username: { type: String, trim: true, minlength: 1 },
    displayName: { type: String, trim: true, minlength: 1 },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

// Replace if-else with 'return bcrypt.compare(inputPassword, user.password)' when bcrypt is introduced
// Right now, we are using resolve to mimic the asynchronous nature of bcrypt
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