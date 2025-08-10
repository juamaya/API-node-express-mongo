# 🚀 Inicio Rápido - Productos Store

Guía paso a paso para ejecutar toda la aplicación con Docker.

## ⚡ Inicio en 2 minutos

### 1. Verificar prerrequisitos
```bash
# Verificar Docker
docker --version
docker-compose --version
```

### 2. Clonar/descargar el proyecto
```bash
cd E:\E_2025\APIS-NODEJS
```

### 3. Ejecutar toda la aplicación
```bash
# Opción A: Usar script NPM (recomendado)
npm run docker:up

# Opción B: Comando directo
docker-compose up -d
```

### 4. Verificar que esté funcionando
```bash
# Ver estado de los servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f
```

### 5. Acceder a la aplicación

| 🌐 Servicio | 🔗 URL | 📝 Descripción |
|------------|-------|----------------|
| **Frontend** | http://localhost:8080 | Interfaz principal de la aplicación |
 

**Credenciales Mongo Express:**
- Usuario: `admin`
- Contraseña: `admin123`

## ✨ ¡Ya está funcionando!

- 🏠 Ve al **frontend** en http://localhost:8080
- 📊 Explora el **dashboard** con estadísticas
- ➕ **Crea productos** usando el formulario
- 🔍 **Busca y filtra** productos
- ✏️ **Edita** productos existentes
 

## 🛑 Para detener la aplicación
```bash
npm run docker:down
# o
docker-compose down
```

## 🔧 Modo desarrollo (opcional)

Para desarrolladores que quieren hacer cambios:

```bash
# Iniciar en modo desarrollo con hot reload
npm run docker:up:dev

# Acceder a:
# - Frontend: http://localhost:5173 (hot reload)
# - API: http://localhost:3000 (nodemon)
```

## 📱 Funcionalidades incluidas

### 🏠 Dashboard
- Estadísticas en tiempo real
- Productos recientes
- Métricas de inventario

### 📦 Gestión de Productos
- ➕ Crear productos
- 📋 Listar con filtros avanzados
- 🔍 Búsqueda por nombre, categoría, precio
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos (soft delete)
- 📊 Paginación automática

### 🎨 Interfaz Moderna
- 📱 Responsive (móvil, tablet, desktop)
- 🎯 Notificaciones toast
- ⚡ Carga rápida con Vite
- 🎨 Diseño con TailwindCSS

### 🔧 Backend Robusto
- 🚀 API REST completa
- 🛡️ Validación de datos
- 🔒 Seguridad con Helmet/CORS
- 📈 Rate limiting
- 🗄️ MongoDB con índices optimizados

## 🆘 Si algo no funciona

### Ver logs detallados
```bash
docker-compose logs [servicio]
# Ejemplo: docker-compose logs frontend
```

### Reconstruir imágenes
```bash
docker-compose build --no-cache
docker-compose up -d
```

### Limpiar todo y empezar de nuevo
```bash
docker-compose down -v --rmi all
npm run docker:up
```

## 📚 Más información

- 📖 Documentación completa: `README.md`
- 🐳 Guía Docker detallada: `DOCKER.md`
- 🎨 Documentación frontend: `frontend/README.md`

¡Disfruta explorando la aplicación! 🎉
