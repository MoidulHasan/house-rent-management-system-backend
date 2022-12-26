const express = require('express');
const { getAll, getOne, addOne, deleteOne, updateOne } = require('../../controllers/renters');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(addOne);

router
    .route('/:id')
    .get(getOne)
    .delete(deleteOne)
    .put(updateOne);


module.exports = router;