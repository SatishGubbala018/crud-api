const { addUser } = require("./addUser");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");
const { getUser, getAllUsers } = require("./getUser");

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers
};
