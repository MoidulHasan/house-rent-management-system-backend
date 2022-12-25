// Dependencies
const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    Unit_Name: {
        type: String,
        required: [true, "Unit Name is required"],
        select: true,
    },
    Building_Name: {
        type: String,
        select: true,
        required: [true, "Building Name is required"],
    },
    Descriptions: {
        type: String,
        select: true
    },
    Category: {
        type: String,
        select: true,
        required: [true, "Category is required"],
    },
    Status: {
        type: String,
        select: true,
        required: [true, "Status is required"],
    },
    Rent_Charge: {
        type: Number,
        select: true,
        required: [true, "Rent Charge is required"],
    },
    Number_of_room: {
        type: Number,
        select: true,
        required: [true, "Number of room is required"],
    },
    Billing: [{
        Month: String,
        Status: String,
        Amount: Number
    }],
    Current_Member_Id: {
        type: String,
        select: true
    }
});

const Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;