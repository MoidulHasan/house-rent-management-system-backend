const express = require('express');
const { getAll, createOne, deleteOne, update } = require('../../controllers/application');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(createOne);


router
    .route('/:id')
    .put(update)
    .delete(deleteOne)




module.exports = router;