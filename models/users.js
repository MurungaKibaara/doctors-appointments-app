const mongoose = require('mongoose')
const Schema = mongoose.Schema

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = Schema({
    name: {
        type: String,
        required : [true, 'name is required']
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validateEmail],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'a valid email address is required'],
        // match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['doctor', 'user'],
        default: 'user'
    }
})


const User = mongoose.model('User', UserSchema);
module.exports = User;