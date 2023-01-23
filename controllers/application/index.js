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
        const features = new APIFeatures(Application.find().populate("user").populate("apartment"), req.query)
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
        console.log(req.body)
        const apartmentData = await Apartment.findById(req.body.apartment)

        console.log(apartmentData)

        if (apartmentData?.applications) {
            apartmentData.applications.push({
                user_id: req.body.user,
                application_id: application._id
            })
        }

        console.log(apartmentData)

        await Apartment.findByIdAndUpdate(req.body.apartment, apartmentData)
    }
}

applicationController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Application.findOneAndDelete({ _id: req.params.id });

        if (doc === null) {
            return next(new AppError(404, 'fail', 'No application found with this id'), req, res, next);
        }

        const user = await User.findById(req.query?.user_id);


        const applications = user?.applications?.filter((application) => {
            return application.application_id != req.params.id
        })

        console.log(applications)

        await User.findByIdAndUpdate(req.query?.user_id, { applications: applications });

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
            Rent_Start_Date: application.apartment.Abailable_From,
        });


        apartment.Renters.push({
            apartment: application.apartment._id,
            renter: renter._id,
            rent_date: application.apartment.Abailable_From,
        });


        await Apartment.findByIdAndUpdate(application.apartment._id, { Renters: apartment.Renters, Status: "Occupied" })

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