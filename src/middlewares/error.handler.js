const { ValidationError } = require('sequelize');

function logErrors(err, _req, _res, next) {
  console.error({ err });
  next(err);
}

function errorHandler(err, _req, res, _next) {
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, _req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function ormErrorHandler(err, _req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
