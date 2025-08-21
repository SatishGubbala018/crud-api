const { updateUser } = require("../../services/users");
const { asyncWraper, sendSuccess } = require("../../utils");

exports.updateUser = asyncWraper(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  
  // Remove sensitive fields from update
  delete updateData.email; // Email shouldn't be changed
  delete updateData._id;
  delete updateData.createdAt;
  delete updateData.updatedAt;
  
  const updatedUser = await updateUser(id, updateData);
  
  sendSuccess(res, 200, "User updated successfully", updatedUser);
});
