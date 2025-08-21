const { getUser, getAllUsers } = require("../../services/users/getUser");
const { asyncWraper: asyncWrapper } = require("../../utils");

const getUserController = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  
  const result = await getUser(id);
  
  if (!result.success) {
    return res.status(404).json({
      success: false,
      message: result.message
    });
  }
  
  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data
  });
});

const getAllUsersController = asyncWrapper(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const { age, city, isActive } = req.query;
  
  const filters = {};
  if (age) filters.age = parseInt(age);
  if (city) filters.city = city;
  if (isActive !== undefined) filters.isActive = isActive === "true";
  
  const result = await getAllUsers(page, limit, search, filters);
  
  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data
  });
});

module.exports = {
  getUser: getUserController,
  getAllUsers: getAllUsersController
};
