const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: {
        type: String,
        required : [true, 'name is required']
    },
    email: {
        type: String,
        lowercase: true,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/,
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