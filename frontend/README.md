# 🎨 Frontend - Productos Store

Frontend moderno construido con React, Vite y TailwindCSS para gestionar productos.

## ✨ Características

- **React 18** con hooks modernos
- **Vite** para desarrollo rápido
- **TailwindCSS** para estilos
- **React Router** para navegación
- **Axios** para peticiones HTTP
- **React Hot Toast** para notificaciones
- **Lucide React** para iconos
- **Responsive Design** adaptable a móviles

## 🚀 Inicio rápido

### Instalar dependencias
```bash
cd frontend
npm install
```

### Configurar variables de entorno
```bash
cp .env.example .env
```

Edita `.env` si necesitas cambiar la URL de la API.

### Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del proyecto

```
frontend/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductFilters.jsx
│   ├── pages/            # Páginas de la aplicación
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CreateProductPage.jsx
│   │   └── EditProductPage.jsx
│   ├── services/         # Servicios para API
│   │   └── productService.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── package.json
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
└── README.md
```

## 📄 Páginas disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Dashboard con estadísticas |
| `/products` | ProductsPage | Lista de productos con filtros |
| `/products/:id` | ProductDetailPage | Detalle de un producto |
| `/create` | CreateProductPage | Crear nuevo producto |
| `/edit/:id` | EditProductPage | Editar producto existente |

## 🎨 Componentes principales

### ProductCard
Tarjeta para mostrar productos con:
- Imagen del producto
- Información básica (nombre, precio, stock)
- Estados de stock (en stock, pocas unidades, agotado)
- Botones de acción (ver, editar, eliminar)

### ProductFilters
Panel de filtros que permite:
- Búsqueda por nombre
- Filtro por categoría
- Filtro por rango de precios
- Mostrar filtros activos

### Navbar
Barra de navegación con:
- Logo de la aplicación
- Enlaces principales
- Indicador de página activa

## 🔧 Servicios

### productService.js
Servicio que maneja todas las peticiones a la API:
- `getProducts(filters)` - Obtener productos con filtros
- `getProduct(id)` - Obtener un producto específico
- `createProduct(data)` - Crear nuevo producto
- `updateProduct(id, data)` - Actualizar producto
- `deleteProduct(id)` - Eliminar producto
- Funciones de utilidad para formateo

## 🎯 Características principales

### Dashboard interactivo
- Estadísticas en tiempo real
- Productos recientes
- Acceso rápido a funciones

### Gestión completa de productos
- Crear, leer, actualizar y eliminar productos
- Validación de formularios
- Manejo de errores

### Búsqueda y filtros avanzados
- Búsqueda por nombre
- Filtros por categoría y precio
- Paginación de resultados

### Interfaz responsive
- Adaptable a móviles y tablets
- Diseño moderno con TailwindCSS
- Animaciones y transiciones suaves

### Notificaciones
- Mensajes de éxito y error
- Toast notifications elegantes
- Feedback inmediato al usuario

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móvil**: < 768px
- 📲 **Tablet**: 768px - 1024px
- 💻 **Desktop**: > 1024px

## 🔄 Estados de carga

Todos los componentes manejan estados de carga con:
- Spinners de carga personalizados
- Estados de error con recuperación
- Skeleton loading (futuro)

## 🎨 Paleta de colores

- **Primary**: Azul (#3b82f6)
- **Success**: Verde (#10b981)
- **Warning**: Naranja (#f59e0b)
- **Error**: Rojo (#ef4444)
- **Gray**: Escala de grises para texto y fondos

## 🚀 Scripts disponibles

```bash
npm run dev        # Desarrollo
npm run build      # Construcción para producción
npm run preview    # Preview de la build
npm run lint       # Linting del código
```

## 🔧 Configuración de desarrollo

### Proxy de API
Vite está configurado para hacer proxy de `/api` hacia el backend:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

### Variables de entorno
- `VITE_API_URL`: URL base de la API (default: http://localhost:3000)

## 🚀 Despliegue

### Build de producción
```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`

### Variables de entorno para producción
```bash
VITE_API_URL=https://tu-api.com
```

## 🤝 Contribuir

Para contribuir al frontend:
1. Mantén la consistencia de estilos con TailwindCSS
2. Usa los hooks de React de forma eficiente
3. Añade validación a los formularios
4. Mantén los componentes reutilizables
5. Documenta los nuevos componentes

## 🔮 Próximas mejoras

- [ ] Modo oscuro
- [ ] Búsqueda en tiempo real
- [ ] Upload de imágenes
- [ ] Exportar datos a CSV/Excel
- [ ] Gráficos y analytics
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)
