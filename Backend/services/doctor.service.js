const doctorModel = require('../models/doctor.model');

module.exports.createDoctor = async ({
    firstname, lastname, email, password, field, experience, licenseId
}) => {
    if (!firstname || !email || !password || !field || experience === undefined || !licenseId) {
        throw new Error('All fields are required');
    }

    const doctor = await doctorModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        speciality: {
            field,
            experience,
            licenseId
        }
    });

    return doctor;
};
