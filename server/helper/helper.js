/** @format */

const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

class Helper {
  constructor() {}

  // hash user password
  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      try {
        return hash;
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  // compare user password
  async comparePassword(password, user) {
    try {
      const result = await bcrypt.compare(password, user.password);
      try {
        // if password is not correct then redirect the user
        if (!result) {
          throw createError.BadRequest("User password is not correct");
        } else {
          return result;
        }
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  // generate token for the user
  async generateToken(user) {
    try {
      const token = await jwt.sign(
        {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      try {
        return token;
      } catch (error) {
        throw createError.BadRequest(error.message);
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new Helper();
