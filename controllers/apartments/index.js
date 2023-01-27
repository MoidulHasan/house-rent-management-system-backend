// Dependencies
const Apartment = require("../../models/apartment");
const AppError = require("../../utils/appError");
const { getAll, createOne, deleteOne, updateOne } = require("../baseController");
const APIFeatures = require("../../utils/apiFeatures");


// Module scafolding
const apartmentController = {};


// Create controller for getting all rooms
apartmentController.getAll = async (req, res, next) => {

    try {
        const features = new APIFeatures(Apartment.find().populate("applications").populate("Building"), req.query)
            .sort()
            .paginate();

        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }
}


apartmentController.getOne = async (req, res, next) => {
    try {
        const doc = await Apartment.find({ Unit_Name: req.body.Unit_Name });

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

    const doc = await Apartment.find({ Unit_Name: req.body.Unit_Name, Building_Name: req.body.Building_Name });

    if (doc.length) {
        return next(new AppError(404, 'fail', 'Apartment Already Registered With This Unit Name'), req, res, next);
    }

    await createOne(Apartment)(req, res, next);
};

apartmentController.updateOne = async (req, res, next) => {

    try {
        const doc = await Apartment.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'Building not found!'), req, res, next);
        }

        await updateOne(Apartment)(req, res, next);
    } catch (error) {
        next(error);
    }

}

apartmentController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Apartment.findOneAndDelete({ _id: req.params.id });

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