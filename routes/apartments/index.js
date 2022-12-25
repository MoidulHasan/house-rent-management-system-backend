const express = require('express');
const { getAll, getOne, addOne, deleteOne, updateOne } = require('../../controllers/apartments');
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



module.exports = router;