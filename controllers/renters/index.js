// Dependencies
const Renter = require("../../models/renter");
const Apartment = require("../../models/apartment");
const AppError = require("../../utils/appError");
const { getAll, createOne, deleteOne } = require("../baseController");


// Module scafolding
const renterController = {};


// Create controller for getting all rooms
renterController.getAll = async (req, res, next) => {
    await getAll(Renter)(req, res, next)
}


renterController.getOne = async (req, res, next) => {
    try {
        const doc = await Renter.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that Renter Id'), req, res, next);
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


renterController.addOne = async (req, res, next) => {

    const { Building_Name, Apartment_Name } = req.body;

    const Apartments = await Apartment.find({ Building_Name: Building_Name, Unit_Name: Apartment_Name });


    if (!Apartments.length) {
        return next(new AppError(404, 'fail', 'Apartment Not found'), req, res, next);
    }
    else if (Apartments[0].Status === "Occupied") {
        return next(new AppError(404, 'fail', 'Apartment is already occupied'), req, res, next);
    }


    const newRenter = await createOne(Renter)(req, res, next);


    if (newRenter) {
        Apartments[0].Status = "Occupied";

        const doc = await Apartment.findByIdAndUpdate(Apartments[0]._id, Apartments[0], {
            new: true,
            runValidators: true
        });
    }
};

renterController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Renter.findOneAndDelete({ _id: req.params.id });

        if (doc === null) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }


        if (doc) {
            const { Building_Name, Apartment_Name } = doc;

            const Apartments = await Apartment.find({ Building_Name: Building_Name, Unit_Name: Apartment_Name });

            if (Apartments.length) {
                Apartments[0].Status = "Unoccupied";

                const doc = await Apartment.findByIdAndUpdate(Apartments[0]._id, Apartments[0], {
                    new: true,
                    runValidators: true
                });
            }
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
module.exports = renterController;