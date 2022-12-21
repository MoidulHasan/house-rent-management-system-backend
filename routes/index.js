/**
 * Name: Main route
 * Description: this module provide top label routes for the application
 * Author: Moidul Hasan Khan
 * Date: 02/09/2022
 */

// Dependencies
const express = require('express');
const router = express.Router();

// import sub routes
const buildingRoutes = require('./building')
const apartmentRoutes = require('./apartments')
const memberRoutes = require('./members')


// Import controllers
const authController = require('./../controllers/auth');

// public routes
router.all('/', (req, res, next) => {
    res.status(200).send("Welcome to House Rent Management System")
})

router.post('/login', authController.login);
router.post('/signup', authController.signup);



// Protect all routes after this middleware
router.use(authController.protect);

router.use('/building', buildingRoutes);
router.use('/apartments', apartmentRoutes);
router.use('/members', memberRoutes);



module.exports = router;