/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Set default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};