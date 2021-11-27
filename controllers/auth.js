const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide name, email and password');
	}

	const user = await User.create({ name, email, password });
	res
		.status(StatusCodes.CREATED)
		.json({ user: { name, email }, token: user.generateToken() });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide your email or password!');
	}

	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new UnauthenticatedError('Invalid email or password!');
	}

	const validPassword = await user.comparePassword(password);
	if (validPassword) {
		res.status(StatusCodes.OK).json({
			user: { name: user.name, email },
			token: user.generateToken(),
		});
	} else {
		throw new UnauthenticatedError('Invalid email or password!');
	}
};

module.exports = {
	register,
	login,
};
