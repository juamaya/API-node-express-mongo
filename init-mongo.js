// Script de inicialización para MongoDB
// Se ejecuta automáticamente cuando se crea el contenedor

// Cambiar a la base de datos productos_db
db = db.getSiblingDB('productos_db');

// Crear usuario para la aplicación
db.createUser({
  user: 'api_user',
  pwd: 'api_password',
  roles: [
    {
      role: 'readWrite',
      db: 'productos_db'
    }
  ]
});

// Crear la colección productos con algunos datos de ejemplo
db.productos.insertMany([
  {
    nombre: 'iPhone 15 Pro',
    descripcion: 'Smartphone Apple iPhone 15 Pro 128GB con cámara profesional',
    precio: 1199.99,
    categoria: 'electronica',
    stock: 25,
    imagen: 'https://example.com/iphone15.jpg',
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nombre: 'Samsung Galaxy S24',
    descripcion: 'Smartphone Samsung Galaxy S24 256GB con pantalla Dynamic AMOLED',
    precio: 899.99,
    categoria: 'electronica',
    stock: 30,
    imagen: 'https://example.com/galaxy-s24.jpg',
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nombre: 'Camiseta Nike Running',
    descripcion: 'Camiseta deportiva Nike Dri-FIT para running',
    precio: 29.99,
    categoria: 'ropa',
    stock: 100,
    imagen: 'https://example.com/nike-shirt.jpg',
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nombre: 'Cafetera Nespresso',
    descripcion: 'Cafetera automática Nespresso con sistema de cápsulas',
    precio: 199.99,
    categoria: 'hogar',
    stock: 15,
    imagen: 'https://example.com/nespresso.jpg',
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nombre: 'Pelota de Fútbol Adidas',
    descripcion: 'Pelota oficial Adidas para fútbol profesional',
    precio: 49.99,
    categoria: 'deportes',
    stock: 50,
    imagen: 'https://example.com/soccer-ball.jpg',
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Crear índices para mejorar el rendimiento
db.productos.createIndex({ nombre: 1 });
db.productos.createIndex({ categoria: 1 });
db.productos.createIndex({ precio: 1 });
db.productos.createIndex({ activo: 1 });

print('Base de datos inicializada correctamente con datos de ejemplo');
print('Productos insertados: ' + db.productos.countDocuments());
print('Índices creados para: nombre, categoria, precio, activo');
