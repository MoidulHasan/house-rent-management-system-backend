// Dependencies
const Apartment = require("../../models/apartment");
const Application = require("../../models/application");
const Renter = require("../../models/renter");
const User = require("../../models/user");
const APIFeatures = require("../../utils/apiFeatures");
const AppError = require("../../utils/appError");
const { getAll, createOne, deleteOne, updateOne } = require("../baseController");
// const APIFeatures = require('../utils/apiFeatures');

// Module scafolding
const applicationController = {};

applicationController.getAll = async (req, res, next) => {
    try {
        const features = new APIFeatures(Application.find().populate("user").populate("apartment").populate({
            path: "apartment",
            populate: "Building"
        }), req.query)
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

applicationController.createOne = async (req, res, next) => {

    const doc = await Application.findOne({ apartment: req.body.apartment, user: req.body.user });

    if (doc) {
        return next(new AppError(404, 'fail', 'You have already applied in this apartment'), req, res, next);
    }

    const application = await createOne(Application)(req, res, next);

    if (application) {
        const apartmentData = await Apartment.findById(req.body.apartment)


        if (apartmentData?.applications) {
            apartmentData.applications.push(
                application._id
            )
        }


        await Apartment.findByIdAndUpdate(req.body.apartment, apartmentData)
    }
}

applicationController.deleteOne = async (req, res, next) => {
    try {

        const doc = await Application.findOne({ _id: req.params.id });

        if (doc === null) {
            return next(new AppError(404, 'fail', 'No application found with this id'), req, res, next);
        }

        const application = await Application.findOneAndDelete({ _id: req.params.id });


        const apartment = await Apartment.findById(req.query?.apartment_id);


        const applications = apartment?.applications?.filter((application) => {
            return application._id != req.params.id
        })


        await Apartment.findByIdAndUpdate(req.query?.apartment_id, { applications: applications });

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
}


const accept = async (req, res, next) => {
    try {
        const application = await Application.findOne({ _id: req.params.id }).populate("user").populate("apartment");

        if (!application) {
            return next(new AppError(404, 'fail', 'No application found with this id'), req, res, next);
        }

        const apartment = await Apartment.findOne({ _id: application.apartment._id, });

        if (!apartment) {
            return next(new AppError(404, 'fail', 'No apartment found with this id'), req, res, next);
        }

        const user = await User.findOne({ _id: application.user._id, });

        if (!user) {
            return next(new AppError(404, 'fail', 'No user found with this id'), req, res, next);
        }


        const renter = await Renter.create({
            User: application.user._id,
            Apartment: application.apartment._id,
        });


        // apartment.renter = renter._id,


        await Apartment.findByIdAndUpdate(application.apartment._id, { renter: renter._id, Status: "Occupied" })

        await Application.findByIdAndUpdate(req.params.id, { application_status: "Accepted" })

        await User.findByIdAndUpdate(application.user._id, { role: "Renter" });

        res.status(201).json({
            status: 'success',
            message: 'Application Accepted'
        });
    } catch (error) {
        next(error);
    }
}

const reject = async (req, res, next) => {
    try {
        const application = await Application.findOne({ _id: req.params.id }).populate("user").populate("apartment");

        if (!application) {
            return next(new AppError(404, 'fail', 'No application found with this id'), req, res, next);
        }

        await Application.findByIdAndUpdate(req.params.id, { application_status: "Rejected" })
        res.status(201).json({
            status: 'success',
            message: 'Application Rejceted'
        });
    } catch (error) {
        next(error);
    }
}


applicationController.update = (req, res, next) => {
    if (req.body.operation === "accept") {
        accept(req, res, next);
    } else {
        reject(req, res, next);
    }
}


module.exports = applicationController;