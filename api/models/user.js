const mongoose = require("../database/database");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    }
}, {
        timestamps: true
    });

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = mongoose.model("User", userSchema);

module.exports = User;