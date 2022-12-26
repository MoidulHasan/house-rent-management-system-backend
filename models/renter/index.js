// Dependencies
const mongoose = require('mongoose');

const RenterSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Renter Name is required"],
        select: true,
        unique: false
    },
    NID: {
        type: String,
        required: [true, "Renter NID Number is required"],
        select: true,
    },
    Phone: {
        type: String,
        required: [true, "Renter Phone Number is required"],
        select: true,
    },
    Permanent_Address: {
        type: String,
        required: [true, "Renter Permanent Address is required"],
        select: true,
    },
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