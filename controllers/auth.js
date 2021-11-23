const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide name, email and password');
	}

	try {
		const user = await User.create({ name, email, password });
		const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
			expiresIn: '30d',
		});
		res.status(StatusCodes.CREATED).json({ user: { name, email }, token });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const login = async (req, res) => {
	res.send('login user');
};

module.exports = {
	register,
	login,
};
