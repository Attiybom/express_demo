const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // 打印错误堆栈供调试

  // 判断错误类型并设置适当的状态码
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'An error occurred',
  });
};

module.exports = errorHandler;
