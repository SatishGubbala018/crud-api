const { asyncWraper, sendSuccess } = require("../../utils");

exports.updateUser = asyncWraper(async (req, res, next) => {
  const user = req.body;
  const updateUser = await addUser(user);
  sendSuccess(res, 201, "User created successfully", newUser);
});
