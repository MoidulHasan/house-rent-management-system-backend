// Dependencies
const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    Unit_Name: {
        type: String,
        required: [true, "Unit Name is required"],
        select: true
    },
    Descriptions: {
        type: String,
        select: true
    },
    Category: {
        type: String,
        select: true
    },
    Status: {
        type: String,
        select: true
    },
    Rent_Charge: {
        type: Number,
        select: true
    },
    Number_of_room: {
        type: String,
        select: true
    },
    Billing: [{
        Month: String,
        Status: String,
        Amount: Number
    }],
    Current_Member_Phone: {
        type: String,
        select: true
    }
});

const Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;