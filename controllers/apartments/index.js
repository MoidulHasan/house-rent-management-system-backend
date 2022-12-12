// Dependencies
const Apartment = require("../../models/apartment");
const AppError = require("../../utils/appError");
const { getAll, createOne } = require("../baseController");


// Module scafolding
const apartmentController = {};


// Create controller for getting all rooms
apartmentController.getAll = async (req, res, next) => {
    await getAll(Apartment)(req, res, next)
}


apartmentController.getOne = async (req, res, next) => {
    try {
        const doc = await Apartment.find({ Unit_Name: req.params.Unit_Name });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that Unit Name'), req, res, next);
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


apartmentController.addOne = async (req, res, next) => {
    await createOne(Apartment)(req, res, next);
};

apartmentController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Apartment.findOneAndDelete({ Unit_Name: req.params.Unit_Name });

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
module.exports = apartmentController;