// Dependencies
const mongoose = require('mongoose');

const MemberSchima = new mongoose.Schema({
    Unit_Name: {
        type: String,
        required: [true, "Unit number is required"],
        select: true
    },
    Name: {
        type: String,
        required: [true, "Member Name is required"],
        select: true
    },
    Phone: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
        select: true
    },
    Email: {
        type: String,
        select: true
    },
    Rent_Date: {
        type: String,
        select: true
    },
});


const Member = mongoose.model("Member", MemberSchima);
module.exports = Member;