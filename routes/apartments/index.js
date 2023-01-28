const express = require('express');
const { getAll, getOne, addOne, deleteOne, updateOne } = require('../../controllers/apartments');
const billController = require('../../controllers/bill');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(addOne);

router
    .route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(deleteOne);

router
    .route('/:id/bill')
    .post(billController.addOne)
    // .get(getOne)

    .delete(billController.deleteOne);


router
    .route('/:id/bill/:billId')
    .put(billController.updateOne);


router
    .route('/:id/bill/accept/:bill_id')
    .get(billController.acceptPayment)


module.exports = router;