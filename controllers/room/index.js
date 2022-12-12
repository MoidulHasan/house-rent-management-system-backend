// Dependencies

const Room = require("../../models/member");
const AppError = require("../../utils/appError");
const { getAll, createOne } = require("../baseController");


// Module scafolding
const roomController = {};


// Create controller for getting all rooms
roomController.getAllRooms = async (req, res, next) => {
    await getAll(Room)(req, res, next)
}


roomController.getOneRoom = async (req, res, next) => {
    try {
        const doc = await Room.find({ Room_Number: req.params.room_number });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        next(error);
    }
}


roomController.addOneRoom = async (req, res, next) => {
    await createOne(Room)(req, res, next);
};

roomController.deleteOneRoom = async (req, res, next) => {
    try {
        const doc = await Room.findOneAndDelete({ Room_Number: req.params.room_number });

        if (doc === null) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

// export module
module.exports = roomController;