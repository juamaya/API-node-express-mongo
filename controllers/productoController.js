const Producto = require('../models/Producto');

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Public
const getProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { categoria, minPrecio, maxPrecio, nombre } = req.query;
    
    // Construir filtro
    let filtro = { activo: true };
    
    if (categoria) {
      filtro.categoria = categoria;
    }
    
    if (minPrecio || maxPrecio) {
      filtro.precio = {};
      if (minPrecio) filtro.precio.$gte = parseFloat(minPrecio);
      if (maxPrecio) filtro.precio.$lte = parseFloat(maxPrecio);
    }
    
    if (nombre) {
      filtro.nombre = { $regex: nombre, $options: 'i' };
    }
    
    const productos = await Producto.find(filtro)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Producto.countDocuments(filtro);
    
    res.status(200).json({
      success: true,
      count: productos.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/productos/:id
// @access  Public
const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Public
const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: producto
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/productos/:id
// @access  Public
const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: producto
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};

// @desc    Eliminar un producto (soft delete)
// @route   DELETE /api/productos/:id
// @access  Public
const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};

module.exports = {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
