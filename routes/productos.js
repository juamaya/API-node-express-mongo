const express = require('express');
const {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productoController');

const router = express.Router();

// Rutas para productos
router.route('/')
  .get(getProductos)
  .post(crearProducto);

router.route('/:id')
  .get(getProducto)
  .put(actualizarProducto)
  .delete(eliminarProducto);

module.exports = router;
