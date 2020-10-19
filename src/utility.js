const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    res.status(404).send(err.message);
    return next(err);
  }
};

exports.catchErrors = catchErrors;
