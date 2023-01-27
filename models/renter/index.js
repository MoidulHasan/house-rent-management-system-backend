// Dependencies
const mongoose = require('mongoose');

const RenterSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment"
    }
});

const Renter = mongoose.model("Renter", RenterSchema);
module.exports = Renter;