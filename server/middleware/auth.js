/** @format */

var createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      throw createError.BadGateway("token is not present");
    } else {
      const isValid = await jwt.verify(token, process.env.SECRET_KEY);
      try {
        req.user = isValid;
        next();
      } catch (error) {
        throw createError.BadRequest("Token is not valid");
      }
    }
  } catch (error) {
    next(error);
  }
};
