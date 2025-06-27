const captainController = require('../controllers/doctor.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike or auto')
], captainController.registerCaptain);


router.post('/login', [
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters long')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;