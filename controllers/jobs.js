const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId })
		.sort('createdAt')
		.exec();

	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
	const job = await Job.find({
		createdBy: req.user.userId,
		_id: req.params.id,
	}).exec();

	if (!job) {
		throw new NotFoundError(`Not found any jobs with id ${req.params.id}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	try {
		const job = await Job.create(req.body);
		res.status(StatusCodes.CREATED).json({ job });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
	}
};

const updateJob = async (req, res) => {
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId },
	} = req;

	if (company === '' || position === '') {
		throw new BadRequestError('Company or Position fields cannot be empty');
	}

	const job = await Job.findByIdAndUpdate(
		{
			_id: jobId,
			createdBy: userId,
		},
		req.body,
		{ new: true, runValidators: true }
	);

	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}
	res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	try {
		const job = await Job.findByIdAndDelete({
			createdBy: req.user.userId,
			_id: req.params.id,
		});

		if (!job) {
			throw new NotFoundError(`Not found any jobs with id ${req.params.id}`);
		}

		res.status(StatusCodes.OK).json({ job });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
	}
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};
