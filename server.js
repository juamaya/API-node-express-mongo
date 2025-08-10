const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware de seguridad
app.use(helmet());

// Configurar CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 100 // limitar cada IP a 100 requests por windowMs
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

// Rutas
app.use('/api/productos', require('./routes/productos'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Productos funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      productos: {
        'GET /api/productos': 'Obtener todos los productos',
        'GET /api/productos/:id': 'Obtener un producto por ID',
        'POST /api/productos': 'Crear un nuevo producto',
        'PUT /api/productos/:id': 'Actualizar un producto',
        'DELETE /api/productos/:id': 'Eliminar un producto'
      }
    }
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en modo ${process.env.NODE_ENV} en el puerto ${PORT}`);
});
