const express = require('express');
const { getAll, getOne, addOne, deleteOne } = require('../../controllers/Member');
const router = express.Router();


router
    .route('/')
    .get(getAll)
    .post(addOne);

router
    .route('/:member_id')
    .get(getOne)
    .delete(deleteOne);



module.exports = router;