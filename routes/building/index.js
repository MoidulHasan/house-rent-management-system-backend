const express = require('express');
const { getAll, getOne, addOne, deleteOne, updateOne } = require('../../controllers/building');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(addOne);

// router
//     .route('/:Building_Name')
//     .get(getOne)
//     .delete(deleteOne);

router
    .route('/:id')
    .get(getOne)
    .put(updateOne)



module.exports = router;