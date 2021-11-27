const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const auth = (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication invalid!');
	}

	// Destructure token
	const token = authHeader.split(' ')[1];

	try {
		var decoded = jwt.verify(token, process.env.JWT_SECRET);
		// attach the user to the job routes
		req.user = { userId: decoded.userId, name: decoded.name };
		next();
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

module.exports = auth;
