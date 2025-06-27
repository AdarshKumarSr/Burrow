const doctorModel = require('../models/doctor.model');
const doctorService = require('../services/doctor.service');
const blackListTokenModel = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');

module.exports.registerDoctor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, speciality } = req.body;

    const isDoctorAlreadyExist = await doctorModel.findOne({ email });
    if (isDoctorAlreadyExist) {
        return res.status(400).json({ error: 'Doctor already exists' });
    }

    const hashPassword = await doctorModel.hashPassword(password);

    const doctor = await doctorService.createDoctor({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        field: speciality.field,
        experience: speciality.experience,
        licenseId: speciality.licenseId,
    });

    const token = doctor.generateAuthToken();

    res.status(201).json({ token, doctor });
};

module.exports.loginDoctor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email }).select('+password');

    if (!doctor) {
        return res.status(401).json({ error: 'Doctor not found' });
    }

    const isMatch = await doctor.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = doctor.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ token, doctor });
};

module.exports.getDoctorProfile = async (req, res, next) => {
    res.status(200).json({ doctor: req.doctor });
};

module.exports.logoutDoctor = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (token) {
        await blackListTokenModel.create({ token });
    }

    res.clearCookie('token');

    res.status(200).json({ message: 'Doctor logged out' });
};
