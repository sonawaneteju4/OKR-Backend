import { ApiError } from "./ApiError.js"; // Adjust the path as needed

// Error-handling middleware
function errorHandler(err, req, res, next) {
  let { statusCode, message, errors } = err;

  // If the error is not an instance of ApiError, create a generic ApiError
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = "Internal Server Error";
    errors = [];
  }

  // Respond with the error message without the stack trace
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

export { errorHandler };
