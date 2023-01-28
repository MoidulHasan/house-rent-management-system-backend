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

        if (doc.Bills)
            doc.Bills.push(req.body);
        else
            doc.Bills = [req.body]

        req.body = doc;


        await updateOne(Apartment)(req, res, next);
    }
    catch (error) {
        next(error)
    }
};


billController.acceptPayment = async (req, res, next) => {
    try {
        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {
            return next(new AppError(404, 'fail', 'Apartment Not Found'), req, res, next);
        }


        const Bills = apartment.Bills.map((bill) => {
            if (bill._id == req.params.bill_id) {
                bill.Status = "Paid"
            }

            return bill;
        });

        const doc = await Apartment.findByIdAndUpdate(req.params?.id, { Bills: Bills });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    }
    catch (error) {
        next(error)
    }

}

billController.updateOne = async (req, res, next) => {
    try {
        const doc = await Apartment.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'Apartment Not Found'), req, res, next);
        }

        const bills = doc.Bills;

        const billData = bills.map((bill) => {
            if (bill?._id == req.params.billId) {
                return req.body
            }
            else {
                return bill;
            }
        });

        const apartment = await Apartment.findByIdAndUpdate(req.params?.id, { Bills: billData });

        if (!apartment) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                apartment
            }
        });
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