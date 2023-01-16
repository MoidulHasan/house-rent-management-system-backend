// Dependencies
const mongoose = require('mongoose');

const RenterSchema = new mongoose.Schema({
    User_Id: mongoose.Schema.Types.ObjectId,
    Building_Name: {
        type: String,
        required: [true, "Building Name is required"],
        select: true,
    },
    Apartment_Name: {
        type: String,
        required: [true, "Apartment Name is required"],
        select: true,
    },
    Rent_Start_Date: {
        type: String,
        required: [true, "Rent Start Date is required"],
        select: true,
    }
});

const Renter = mongoose.model("Renter", RenterSchema);
module.exports = Renter;