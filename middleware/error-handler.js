const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(err);
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wring, try again later',
	};

	if (err.name === 'CastError') {
		customError.msg = `Not found item with id: ${err.value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	if (err.name === 'ValidationError') {
		customError.msg = Object.values(
			err.errors.map((item) => item.message).join(', ')
		);
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicated value entered for '${Object.values(
			err.keyValue
		)}' field. Please try with another value!`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	// return res.status(customError.statusCode).json({ err });
	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
