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
    .put(billController.updateOne)
    .delete(billController.deleteOne);


module.exports = router;