// Dependencies
const Application = require("../../models/application");
const User = require("../../models/user");
const AppError = require("../../utils/appError");
const { getAll, createOne, deleteOne, updateOne } = require("../baseController");


// Module scafolding
const applicationController = {};

applicationController.getAll = async (req, res, next) => {
    await getAll(Application)(req, res, next);
}

applicationController.createOne = async (req, res, next) => {

    const doc = await Application.findOne({ apartment_id: req.body.apartment_id, user_id: req.body.user_id });

    if (doc) {
        return next(new AppError(404, 'fail', 'You have already applied in this apartment'), req, res, next);
    }

    const application = await createOne(Application)(req, res, next);

    if (application) {
        const user = await User.findById(req.body.user_id);

        if (user.applications) {
            user.applications.push({
                apartment_id: req.body.apartment_id,
                application_id: application._id
            })
        }

        await User.findByIdAndUpdate(req.body.user_id, user)
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




module.exports = applicationController;