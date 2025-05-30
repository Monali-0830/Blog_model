// middleware/auth.js
const jwt       = require('jsonwebtoken');
const UserModel = require('../models/user');
require('dotenv').config();

module.exports = async function UserAuth(req, res, next) {
    try {
    // 1. Read token by name
    const token = req.cookies.Token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    // 2. Verify the token
    const userData = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch the user
    const user = await UserModel.findById(userData._id);
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    // 4. Attach user to request and continue
    req.user = user;
    next();

    } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: err.message });
    }
};
