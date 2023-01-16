// Dependencies
const mongoose = require('mongoose');

const ApplicationSchima = new mongoose.Schema({
    apartment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartments',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    application_date: {
        type: Date,
        default: new Date(),
        select: true
    },
    application_status: {
        type: String,
        default: "Pending",
        required: true,
        select: true
    }
});


const Application = mongoose.model("Application", ApplicationSchima);
module.exports = Application;