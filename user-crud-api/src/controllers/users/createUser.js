const { addUser } = require("../../services/users");
const { asyncWraper, sendSuccess } = require("../../utils");

exports.createUser = asyncWraper(async (req, res, next) => {
  const user = req.body;
  const newUser = await addUser(user);
  sendSuccess(res, 201, "User created successfully", newUser);
});
