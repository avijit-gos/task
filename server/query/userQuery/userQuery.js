/** @format */

const mongoose = require("mongoose");
const User = require("../../model/userModel/userModel");
const createError = require("http-errors");
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../../helper/helper");

class UserQuery {
  constructor() {}

  async saveNewUser(data) {
    try {
      // check user with same email or username is already being exists in our database or not
      const userIsExists = await User.findOne({
        $or: [{ email: data.email }, { username: data.username }],
      });
      try {
        // if user with same email or username already exists then don't save the user
        if (userIsExists) {
          throw createError.BadRequest(
            "User with same Email or Username already exists"
          );
        } else {
          // hash user password
          const hash = await hashPassword(data.password);

          // create user instance
          const userData = User({
            _id: new mongoose.Types.ObjectId(),
            name: data.name,
            username: data.username,
            email: data.email,
            password: hash,
          });
          const user = await userData.save();
          try {
            // after successfully saved user data generate token for the user
            const token = await generateToken(user);
            try {
              // if every thing went successfull return the user and token to save in frontend
              return { user: user, token: token };
            } catch (error) {
              throw createError.BadRequest(error.message);
            }
          } catch (error) {
            throw createError.BadRequest(error.message);
          }
        }
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async loggedUserVerification(data) {
    try {
      // check user with same email or username is already being exists in our database or not
      const userIsExists = await User.findOne({
        $or: [{ email: data.logUser }, { username: data.logUser }],
      });
      try {
        // if user with this email or username does not exists then don't go further
        if (!userIsExists) {
          throw createError.BadRequest(
            "User with this Email or Username does not exists"
          );
        } else {
          // compare user password
          const isPasswordCorrext = await comparePassword(
            data.password,
            userIsExists
          );

          // if password is correct then generate token for the user
          const token = await generateToken(userIsExists);
          try {
            return { user: userIsExists, token: token };
          } catch (error) {
            throw createError.BadRequest(error.message);
          }
        }
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async fetchUsers(page, limit) {
    // fetch all users with out password
    const users = await User.find()
      .select("-password")
      .skip(page * limit)
      .limit(limit);
    try {
      return users;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
    try {
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async fetchUserById(id) {
    // fetch single user by user_id. here mongoDB bydefault create _id as index
    const user = await User.findById(id).select("-password");
    try {
      return user;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async findUserByIdAndUpdate(id, name) {
    try {
      const updateUserInfo = await User.findByIdAndUpdate(
        id,
        { $set: { name: name } },
        { name: true }
      );
      try {
        return updateUserInfo;
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async findUserByIdAndDelete(id) {
    try {
      const updateUserInfo = await User.findByIdAndDelete(id);
      try {
        return updateUserInfo;
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new UserQuery();
