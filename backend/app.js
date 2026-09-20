const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));

// Rutas de la API
app.use('/api/products', require('./routes/productRoutes'));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Documentación interactiva de la API (OpenAPI 3.0)
const openapiDoc = YAML.parse(
  fs.readFileSync(path.join(__dirname, 'docs/openapi.yaml'), 'utf8')
);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));

// Manejo centralizado de errores (debe ir al final)
app.use(require('./middlewares/errorHandler'));

module.exports = app;