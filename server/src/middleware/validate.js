const AppError = require("../utils/AppError");
const ERR = require("../constants/errorCodes");
const { ZodError } = require("zod");

exports.validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next( new AppError(ERR.VALIDATION_ERROR,err.issues[0]?.message || "Invalid request data",400,err.issues));
    }
    return next(err);
  }
};
