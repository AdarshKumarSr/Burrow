const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 8 characters long'],
        select: false   
    },
    soketid: {
        type: String,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },

    speciality: {
        field: {
            type: String,
            required: true,
            minlength: [3, 'Speciality field must be at least 3 characters long']
        },
        experience: {
            type: Number,
            required: true,
            min: [0, 'Experience must be a non-negative number']
        },
        licenseId: {
            type: String,
            required: true,
            minlength: [3, 'License ID must be at least 3 characters long']
        }
    },

    location: {
        lat: {
            type: Number,
            
        },
        lng: {
            type: Number,
        }
    }
});


doctorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

doctorSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


doctorSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const doctorModel = mongoose.model('doctor', doctorSchema);

module.exports = doctorModel;
