module.exports = (err, req, res, next) => {
  console.error(err);

  return res.status(err.status || 500).json({
    ok: false,
    error: {
      code: err.code || "SERVER_ERROR",
      message: err.message || "Something went wrong"
    }
  });
};
