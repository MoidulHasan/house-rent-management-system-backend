// Dependencies
const Building = require("../../models/building");
const Apartment = require("../../models/apartment");
const AppError = require("../../utils/appError");
const { getAll, createOne, updateOne, deleteOne, deleteMany } = require("../baseController");


// Module scafolding
const buildingController = {};


// Create controller for getting all rooms
buildingController.getAll = async (req, res, next) => {
    await getAll(Building)(req, res, next)
}


buildingController.getOne = async (req, res, next) => {
    try {
        const doc = await Building.findById(req.params.id);

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
        return next(new AppError(404, 'fail', 'Building already added with this name'), req, res, next);
    }

    await createOne(Building)(req, res, next);
};


buildingController.updateOne = async (req, res, next) => {
    try {
        const doc = await Building.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'Building not found!'), req, res, next);
        }

        await updateOne(Building)(req, res, next);
    }
    catch (error) {
        next(error)
    }
}


buildingController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Building.findByIdAndDelete(req.params.id);

        if (doc === null) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        const apartments = Apartment.

            res.status(200).json({
                status: 'success',
                data: null
            });
    } catch (error) {
        next(error);
    }
};

buildingController.deleteMany = async (req, res, next) => {
    await deleteMany(Building)(req, res, next);
};

// export module
module.exports = buildingController;