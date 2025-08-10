# API de Productos - Node.js, Express y MongoDB

Una API REST completa para la gestión de productos construida con Node.js, Express.js y MongoDB.

## 🚀 Características

- **CRUD completo** para productos
- **Paginación** automática
- **Filtros** por categoría, precio y nombre
- **Validación** de datos
- **Manejo de errores** robusto
- **Seguridad** con Helmet y CORS
- **Rate limiting** para prevenir abuso
- **Soft delete** para productos

## 📋 Requisitos

- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- npm o yarn

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Edita el archivo `.env` con tu configuración de MongoDB

3. Iniciar MongoDB (si es local):
```bash
mongod
```

4. Ejecutar la aplicación:

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

La API estará disponible en `http://localhost:3000`

## 📚 Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

### Parámetros de consulta (GET /api/productos)

- `page`: Número de página (default: 1)
- `limit`: Productos por página (default: 10)
- `categoria`: Filtrar por categoría
- `minPrecio`: Precio mínimo
- `maxPrecio`: Precio máximo
- `nombre`: Buscar por nombre (búsqueda parcial)

**Ejemplo:**
```
GET /api/productos?categoria=electronica&minPrecio=100&maxPrecio=500&page=1&limit=5
```

## 🏗️ Estructura del Producto

```json
{
  "nombre": "string (requerido, máx 100 caracteres)",
  "descripcion": "string (requerido, máx 500 caracteres)",
  "precio": "number (requerido, >= 0)",
  "categoria": "string (requerido: electronica, ropa, hogar, deportes, libros, otros)",
  "stock": "number (default: 0, >= 0)",
  "imagen": "string (opcional)",
  "activo": "boolean (default: true)"
}
```

## 📝 Ejemplos de uso

### Crear un producto
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "iPhone 15",
    "descripcion": "Smartphone Apple iPhone 15 128GB",
    "precio": 999.99,
    "categoria": "electronica",
    "stock": 50,
    "imagen": "https://example.com/iphone15.jpg"
  }'
```

### Obtener productos con filtros
```bash
curl "http://localhost:3000/api/productos?categoria=electronica&minPrecio=500&limit=5"
```

### Actualizar un producto
```bash
curl -X PUT http://localhost:3000/api/productos/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 899.99,
    "stock": 45
  }'
```

## 🏗️ Estructura del proyecto

```
├── config/
│   └── database.js          # Configuración de MongoDB
├── controllers/
│   └── productoController.js # Lógica de controladores
├── middleware/
│   └── errorHandler.js      # Manejo de errores
├── models/
│   └── Producto.js          # Modelo de Mongoose
├── routes/
│   └── productos.js         # Rutas de la API
├── .env                     # Variables de entorno
├── package.json
├── README.md
└── server.js               # Servidor principal
```

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso entre orígenes
- **Rate Limiting**: 100 requests por 10 minutos por IP
- **Validación**: Validación de entrada con Mongoose

## 📈 Próximas mejoras

- [ ] Autenticación y autorización (JWT)
- [ ] Upload de imágenes
- [ ] Tests unitarios e integración
- [ ] Documentación con Swagger
- [ ] Caché con Redis
- [ ] Logging avanzado

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
