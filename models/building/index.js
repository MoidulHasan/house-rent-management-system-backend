// Dependencies
const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
    Building_Name: {
        type: String,
        required: [true, "Building Name is required"],
        select: true,
        unique: [true, "Building name must be unique"]
    },
    Descriptions: {
        type: String,
        select: true
    },
    Address: {
        type: String,
        select: true
    },
    Caretaker_Name: {
        type: String,
        select: true
    },
    Caretaker_Phone: {
        type: String,
        select: true
    }
});

const Building = mongoose.model("Building", BuildingSchema);
module.exports = Building;