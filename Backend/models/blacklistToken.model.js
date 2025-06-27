const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

const blackListTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);
module.exports = blackListTokenModel;