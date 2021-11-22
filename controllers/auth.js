const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide name, email and password');
	}

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = { name, email, password: hashPassword };
	const user = await User.create({ ...newUser });
	res.status(StatusCodes.CREATED).json({ name, email });
};

const login = async (req, res) => {
	res.send('login user');
};

module.exports = {
	register,
	login,
};
