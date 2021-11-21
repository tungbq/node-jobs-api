require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

app.use(express.json());

//routes
app.get('/', (req, res) => {
	res.send('This is jobs API!');
});

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
