const express = require('express');
const { getAll, getOne, addOne, deleteOne } = require('../../controllers/apartments');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(addOne);

router
    .route('/:id')
    .get(getOne)
    .delete(deleteOne);



module.exports = router;