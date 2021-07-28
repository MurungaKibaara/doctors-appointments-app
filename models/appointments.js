const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start: {
        type: Date,
        default: Date.now,
        required: [true, 'Content field is required']
    },
    finish: {
        type: Date,
        // default: Date.now,
        required: [true, 'Content field is required']
    },
    state: {
        type: String,
        enum: ['cancelled','pending','completed'],
        default: 'pending'
    },
})

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;