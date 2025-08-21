const User = require("../../models/User");

exports.updateUser = async (userId, updateData) => {
  // Remove fields that shouldn't be updated
  delete updateData._id;
  delete updateData.createdAt;
  delete updateData.updatedAt;
  
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { 
      new: true, 
      runValidators: true 
    }
  );
  
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  
  return user;
};
