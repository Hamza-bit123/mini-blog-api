const handleError = (err, req, res, next) => {
  if (err instanceof Error)
    return res.json({ success: false, error: err.message });

  next();
};

module.exports = handleError;
