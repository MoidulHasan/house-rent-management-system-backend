// Dependencies
const Apartment = require("../../models/apartment");
const AppError = require("../../utils/appError");
const { getAll, createOne, deleteOne, updateOne } = require("../baseController");


// Module scafolding
const billController = {};


billController.addOne = async (req, res, next) => {
    try {
        const doc = await Apartment.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'Apartment Not Found'), req, res, next);
        }

        const bills = doc.Billing;

        const billMonth = bills.filter((bill) => bill?.BillMonthAndYear === req.body.BillMonthAndYear);


        if (billMonth.length) {
            return next(new AppError(404, 'fail', 'Bill already added on this month'), req, res, next);
        }

        doc.Billing.push(req.body);

        req.body = doc;

        await updateOne(Apartment)(req, res, next);
    }
    catch (error) {
        next(error)
    }
};

billController.updateOne = async (req, res, next) => {
    try {
        const doc = await Apartment.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'Apartment Not Found'), req, res, next);
        }

        const bills = doc.Billing;

        const billData = bills.filter((bill) => bill?._id == req.body._id);

        if (!billData) {
            return next(new AppError(404, 'fail', 'Bill not created.'), req, res, next);
        }


        doc.Billing = bills.filter(bill => {
            return bill._id != req.body._id;
        });



        doc.Billing.push(req.body);

        req.body = doc;

        await updateOne(Apartment)(req, res, next);
    }
    catch (error) {
        next(error)
    }
}

billController.deleteOne = async (req, res, next) => {
    try {
        const doc = await Apartment.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'Apartment Not Found'), req, res, next);
        }

        const bills = doc.Billing;

        const billData = bills.filter((bill) => bill?._id == req.body._id);

        if (!billData) {
            return next(new AppError(404, 'fail', 'Bill not created.'), req, res, next);
        }


        if (billData[0].Status === "Paid") {
            return next(new AppError(404, 'fail', 'Already bill paid, Now it not possible to delete.'), req, res, next);
        }


        doc.Billing = bills.filter(bill => {
            return bill._id != req.body._id;
        });

        req.body = doc;

        await updateOne(Apartment)(req, res, next);
    } catch (error) {
        next(error);
    }
};

// export module
module.exports = billController;