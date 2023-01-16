// Dependencies
const Apartment = require("../../models/apartment");
const AppError = require("../../utils/appError");
const { getAll, createOne } = require("../baseController");


// Module scafolding
const RentController = {};


// Create controller for getting all rooms
RentController.getAll = async (req, res, next) => {
    await getAll(Apartment)(req, res, next)
}

RentController.getOne = async (req, res, next) => {
    try {
        const doc = await Apartment.find({ _id: req.params._id });

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


// RentController.addOne = async (req, res, next) => {
//     await createOne(Member)(req, res, next);
// };


// RentController.deleteOne = async (req, res, next) => {
//     try {
//         const doc = await Member.findOneAndDelete({ _id: req.params._id });

//         if (doc === null) {
//             return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
//         }

//         res.status(200).json({
//             status: 'success',
//             data: null
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// export module
module.exports = RentController;