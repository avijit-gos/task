/** @format */
const createError = require("http-errors");
const {
  saveNewUser,
  loggedUserVerification,
  fetchUsers,
  fetchUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
} = require("../../query/userQuery/userQuery");

class UserController {
  constructor() {}

  // 1. Register user route
  async createUser(req, res, next) {
    try {
      // destructure req.body
      const { name, email, username, password } = req.body;
      // check if user try to register with an empty value or not
      if (
        !name.trim() ||
        !email.trim() ||
        !username.trim() ||
        !password.trim()
      ) {
        throw createError.Conflict("All the fields are required");
      } else {
        const user = await saveNewUser(req.body);
        try {
          return res.status(201).json(user);
        } catch (error) {
          throw createError.BadRequest(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      // destructure req.body
      // *** LOGUSER CAN BE USER EMAIL OR USERNAME
      const { logUser, password } = req.body;
      // check if user try to login with an empty value or not
      if (!logUser.trim() || !password.trim()) {
        throw createError.Conflict("All the fields are required");
      } else {
        const result = await loggedUserVerification(req.body);
        try {
          return res.status(200).json(result);
        } catch (error) {
          throw createError.BadRequest(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 3. Get all user
  async fetchAllUser(req, res, next) {
    try {
      const page = req.query.page || 0;
      const limit = req.query.limit || 5;
      const users = await fetchUsers(page, limit);
      try {
        return res.status(200).json(users);
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  // 4. Fetch single user
  async fetchSingleUser(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Request ID is not present");
      } else {
        const user = await fetchUserById(req.params.id);
        try {
          return res.status(200).json(user);
        } catch (error) {
          throw createError.BadRequest(error.message);
        }
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  // 5. Update user details
  async updateUser(req, res, next) {
    try {
      if (!req.body.name) {
        throw createError.BadRequest("Empty request body");
      } else {
        const user = await findUserByIdAndUpdate(req.user._id, req.body.name);
        try {
          return res.status(200).json(user);
        } catch (error) {
          throw createError.BadRequest(error.message);
        }
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  // 6. Delete user
  async deleteUser(req, res, next) {
    try {
      const user = await findUserByIdAndDelete(req.user._id);
      try {
        return res.status(200).json({ msg: "User has been deleted", user });
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new UserController();
