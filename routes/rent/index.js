const express = require('express');
const { getAll, getOne } = require('../../controllers/rent');
const router = express.Router();


router
    .route('/')
    .get(getAll)

router
    .route('/:member_id')
    .get(getOne)

module.exports = router;