const mongoose = require("../database/database");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    }
}, {
        timestamps: true
    });

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = mongoose.model("User", userSchema);

module.exports = User;