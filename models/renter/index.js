// Dependencies
const mongoose = require('mongoose');

const RenterSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        Refs: "User"
    },
    Apartment: {
        type: mongoose.Schema.Types.ObjectId,
        Refs: "Apartment"
    },
    Rent_Start_Date: {
        type: String,
        required: [true, "Rent Start Date is required"],
        select: true,
    }
});

const Renter = mongoose.model("Renter", RenterSchema);
module.exports = Renter;