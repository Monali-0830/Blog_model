const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const validator = require('validator');

const Signup = async (req, res) => {
  try {
    const { firstName, emailId, password } = req.body;

    if (!firstName || !emailId || !password) {
      throw new Error("All fields are required");
    }

    if (!validator.isEmail(emailId)) {
      throw new Error("Email ID is invalid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Please enter a strong password");
    }

    const existing = await UserModel.findOne({ emailId });
    if (existing) {
      throw new Error("Email already exists. Please login.");
    }

    const passHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      firstName,
      emailId,
      password: passHash
    });

    const token = jwt.sign(
      { id: user._id, email: user.emailId },
      process.env.JWT_SECRET || 'your_jwt_secret', // keep secret in .env
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = Signup;
