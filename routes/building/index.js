const express = require('express');
const { getAll, getOne, addOne, deleteOne, updateOne, deleteMany } = require('../../controllers/building');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .delete(deleteMany)
    .post(addOne);


router
    .route('/:id')
    .get(getOne)
    .delete(deleteOne)
    .put(updateOne)



module.exports = router;