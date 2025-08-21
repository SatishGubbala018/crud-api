const User = require("../../models/User");

exports.addUser = async (user) => {
  return await User.create(user);
};
