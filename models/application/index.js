// Dependencies
const mongoose = require('mongoose');

const ApplicationSchima = new mongoose.Schema({
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        enum: ["Pending", "Accepted", "Rejected"],
        required: true,
        select: true
    }
});


const Application = mongoose.model("Application", ApplicationSchima);
module.exports = Application;