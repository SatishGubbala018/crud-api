const { deleteUser } = require("../../services/users/deleteUser");
const { asyncWraper: asyncWrapper } = require("../../utils");

const deleteUserController = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const result = await deleteUser(id);

  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data,
  });
});

module.exports = { deleteUser: deleteUserController };
