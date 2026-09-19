// Middleware centralizado: captura todos los errores de la aplicación
const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join('. ');
  }

  // ID con formato inválido
  if (err.name === 'CastError') {
    status = 400;
    message = 'El identificador proporcionado no es válido';
  }

  res.status(status).json({ success: false, message });
};

module.exports = errorHandler;