// Dependencies
const Member = require("../../models/member");
const AppError = require("../../utils/appError");
const { getAll, createOne } = require("../baseController");


// Module scafolding
const MemberController = {};


// Create controller for getting all rooms
MemberController.getAll = async (req, res, next) => {
    await getAll(Member)(req, res, next)
}

MemberController.getOne = async (req, res, next) => {
    try {
        const doc = await Member.find({ _id: req.params._id });

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


MemberController.addOne = async (req, res, next) => {
    await createOne(Member)(req, res, next);
};


MemberController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Member.findOneAndDelete({ _id: req.params._id });

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
module.exports = MemberController;