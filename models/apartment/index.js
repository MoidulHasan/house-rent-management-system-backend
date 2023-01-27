// Dependencies
const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    Unit_Name: {
        type: String,
        required: [true, "Unit Name is required"],
        select: true,
    },
    Building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
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
    Number_of_Bathroom: {
        type: Number,
        select: true,
        required: [true, "Number of room is required"],
    },
    Bills: [{
        BillMonthAndYear: String,
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        Bills: [
            {
                BillName: String,
                Amount: Number
            }
        ],
        Status: String,
    }],
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Renter',
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        },
    ]
});

const Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment;