// Dependencies
const Building = require("../../models/building");
const AppError = require("../../utils/appError");
const { getAll, createOne, deleteOne } = require("../baseController");


// Module scafolding
const buildingController = {};


// Create controller for getting all rooms
buildingController.getAll = async (req, res, next) => {
    await getAll(Building)(req, res, next)
}


buildingController.getOne = async (req, res, next) => {
    try {
        const doc = await Building.find({ Building_Name: req.body.Building_Name });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that Building Name'), req, res, next);
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


buildingController.addOne = async (req, res, next) => {

    const doc = await Building.find({ Building_Name: req.body.Building_Name });

    if (doc.length) {
        return next(new AppError(404, 'fail', 'Apartment Already Registered With This Unit Name'), req, res, next);
    }

    await createOne(Building)(req, res, next);
};

buildingController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Building.findOneAndDelete({ _id: req.params.id });

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
module.exports = buildingController;