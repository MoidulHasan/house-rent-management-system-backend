const express = require('express');
const { getAllRooms, getOneRoom, addOneRoom, deleteOneRoom } = require('../../controllers/room');
const router = express.Router();




router
    .route('/')
    .get(getAllRooms)
    .post(addOneRoom);

router
    .route('/:room_number')
    .get(getOneRoom)
    .delete(deleteOneRoom);



module.exports = router;