const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/doctor.model');

// ================= USER AUTH =================
module.exports.authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.token ||
      (authHeader && authHeader.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'You need to login first' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: use decoded._id (NOT decoded.id)
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('authUser error:', error.message);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};

// ================= DOCTOR AUTH =================
module.exports.authCaptain = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.token ||
      (authHeader && authHeader.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'You need to login first' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: use decoded._id (NOT decoded.id)
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: 'Doctor not found' });
    }

    req.captain = captain;
    next();
  } catch (error) {
    console.error('authCaptain error:', error.message);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};
