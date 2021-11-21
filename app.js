require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// Connect to DB

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('This is jobs API!');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// use middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(
			port,
			console.log(`Server is up and running on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
