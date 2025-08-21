const { createUser } = require("./createUser");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");
const { getUser, getAllUsers } = require("./getUser");

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers
};
