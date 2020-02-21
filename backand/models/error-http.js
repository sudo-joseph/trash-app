class HttpError extends Error {
    constructor(message, httpStatusCode) {
        super(message); // message goes to Error class
        this.code = httpStatusCode; // non 2xxx code
    }
}

module.exports = HttpError;