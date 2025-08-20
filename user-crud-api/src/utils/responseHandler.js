const sendSuccess = (res, statusCode, message = "", data) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};

const sendError = (res, statusCode, message, error = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

module.exports = { sendSuccess, sendError };
