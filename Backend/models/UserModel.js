const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    pet: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;