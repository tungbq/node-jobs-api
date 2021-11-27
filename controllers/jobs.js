const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
	res.send('get all jobs');
};

const getJob = async (req, res) => {
	res.send('get single job');
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
	res.send('update job');
};

const deleteJob = async (req, res) => {
	res.send('delete job');
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};
