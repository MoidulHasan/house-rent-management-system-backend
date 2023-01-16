/**
 * Name: Main route
 * Description: this module provide top label routes for the application
 * Author: Moidul Hasan Khan
 * Date: 02/09/2022
 */

// Dependencies
const express = require('express');
const router = express.Router();


// renters route
const applicationRoutes = require('./application')


// import sub routes
const buildingRoutes = require('./building')
const apartmentRoutes = require('./apartments')
const memberRoutes = require('./members')
const renterRoute = require("./renters")
const rentRoute = require("./rent")

// Import controllers
const authController = require('./../controllers/auth');

// public routes
router.all('/', (req, res, next) => {
    res.status(200).send("Welcome to House Rent Management System")
})

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.use('/rent', rentRoute);



// Protect all routes after this middleware
router.use(authController.protect);

// renters route
router.use('/application', applicationRoutes)



// admin routes
router.use('/building', buildingRoutes);
router.use('/apartments', apartmentRoutes);
router.use('/members', memberRoutes);
router.use('/renters', renterRoute);




module.exports = router;