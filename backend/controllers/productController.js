const Product = require('../models/Product');

// GET /api/products — catálogo público con filtros opcionales
const getProducts = async (req, res, next) => {
  try {
    const { categoria, buscar, limite = 20, pagina = 1 } = req.query;

    const filtro = { activo: true };
    if (categoria) filtro.categoria = categoria;
    if (buscar) filtro.$text = { $search: buscar };

    const productos = await Product.find(filtro)
      .limit(Number(limite))
      .skip((Number(pagina) - 1) * Number(limite))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filtro);

    res.json({ success: true, total, pagina: Number(pagina), data: productos });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, data: producto });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const producto = await Product.create(req.body);
    res.status(201).json({ success: true, data: producto });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, data: producto });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id — desactivación lógica, no borrado físico
const deleteProduct = async (req, res, next) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, message: 'Producto desactivado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};