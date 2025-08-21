const User = require("../../models/User");

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    
    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null
      };
    }

    return {
      success: true,
      message: "User retrieved successfully",
      data: user
    };
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (page = 1, limit = 10, search = "", filters = {}) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build search query
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    
    // Add additional filters
    if (filters.age) {
      query.age = filters.age;
    }
    if (filters.city) {
      query.city = { $regex: filters.city, $options: "i" };
    }
    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    return {
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUser,
  getAllUsers
};
