const User = require("../../models/User");
const { CustomError } = require("../../utils");

const deleteUser = async (userId) => {
  try {
    // Find user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // Soft delete by setting isActive to false
    user.isActive = false;
    await user.save();

    return {
      success: true,
      message: "User deleted successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        deletedAt: new Date()
      }
    };
  } catch (error) {
    if (error.name === "CastError") {
      throw new CustomError("Invalid user ID format", 400);
    }
    throw error;
  }
};

module.exports = { deleteUser };
