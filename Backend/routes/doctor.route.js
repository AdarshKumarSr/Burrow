const doctorController = require('../controllers/doctor.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    body('email')
        .isEmail()
        .withMessage('Please fill a valid email address'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 8 characters long'),

    body('speciality.field')
        .isLength({ min: 3 })
        .withMessage('Speciality field must be at least 3 characters long'),

    body('speciality.experience')
        .isInt({ min: 0 })
        .withMessage('Experience must be a non-negative number'),

    body('speciality.licenseId')
        .isLength({ min: 3 })
        .withMessage('License ID must be at least 3 characters long')

], doctorController.registerDoctor);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please fill a valid email address'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 8 characters long')
], doctorController.loginDoctor);


router.get('/profile', authMiddleware.authCaptain, doctorController.getDoctorProfile);


router.get('/logout', authMiddleware.authCaptain, doctorController.logoutDoctor);

module.exports = router;
