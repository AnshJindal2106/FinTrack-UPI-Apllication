export const notFound = (request, response) => {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.originalUrl}` });
};

export const errorHandler = (error, _request, response, _next) => {
  const status = error.status ?? 500;
  response.status(status).json({ message: status === 500 ? 'Something went wrong on the server.' : error.message });
};
