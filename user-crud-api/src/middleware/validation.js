const { validateUserInput, validateUserUpdate } = require('../utils/validators');
const { sendError } = require('../utils/responseHandler');

const validateCreateUser = (req, res, next) => {
  const errors = validateUserInput(req.body);
  if (errors.length > 0) {
    return sendError(res, 400, errors.join(', '));
  }
  next();
};

const validateUpdateUser = (req, res, next) => {
  const errors = validateUserUpdate(req.body);
  if (errors.length > 0) {
    return sendError(res, 400, errors.join(', '));
  }
  next();
};

module.exports = { validateCreateUser, validateUpdateUser };
