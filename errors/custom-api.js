class CustomAPIError extends Error {
	constructor(message) {
		super(message);
	}
}

module.export = CustomAPIError;
