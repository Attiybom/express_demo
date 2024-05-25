const errorHandler = (err, req, res, next) => {
  if (err.message) {
    res.status(err.status || 500).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;
