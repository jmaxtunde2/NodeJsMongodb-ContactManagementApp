const { constants } = require("../constant");
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || res.statusCode || 500; // Use error's statusCode, response's statusCode, or default to 500
    res.status(statusCode); // Explicitly set the status code in the response

    console.error("Error: ", error); // Log the error for debugging

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: error.message,
                stack: process.env.NODE_ENV === "production" ? null : error.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: error.message,
                stack: process.env.NODE_ENV === "production" ? null : error.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: error.message,
                stack: process.env.NODE_ENV === "production" ? null : error.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: error.message,
                stack: process.env.NODE_ENV === "production" ? null : error.stack
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: error.message,
                stack: process.env.NODE_ENV === "production" ? null : error.stack
            });
            break;
        default:
            res.json({
                title: "Error",
                message: error.message,
                stack: process.env.NODE_ENV === "production" ? null : error.stack
            });
            break;
    }
};

module.exports = errorHandler;