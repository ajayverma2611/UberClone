const express = require('express');
const router = require('express').Router();
const { body } = require('express-validator');


const captainController = require('../controllers/captain.controller');


router.post('/register' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First Name must be atleast 3 characters Long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 character long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'bus']).withMessage('Tnvalid vehicle type')
],

    captainController.registerCaptain

)


module.exports = router;