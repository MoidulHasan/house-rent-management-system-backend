const express = require('express');
const { getAll, createOne, deleteOne } = require('../../controllers/application');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(createOne);


router
    .route('/:id')
    // .get(getOne)
    .delete(deleteOne)
// .put(updateOne)



module.exports = router;