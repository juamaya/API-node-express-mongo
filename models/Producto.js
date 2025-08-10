const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: {
      values: ['electronica', 'ropa', 'hogar', 'deportes', 'libros', 'otros'],
      message: 'Categoría no válida'
    }
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  imagen: {
    type: String,
    default: ''
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para mejorar la búsqueda
ProductoSchema.index({ nombre: 1 });
ProductoSchema.index({ categoria: 1 });
ProductoSchema.index({ precio: 1 });

module.exports = mongoose.model('Producto', ProductoSchema);
