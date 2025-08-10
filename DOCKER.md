# 🐳 Guía de Docker para API de Productos

Esta guía te ayudará a ejecutar la API de productos usando Docker y Docker Compose.

## 🔧 Prerrequisitos

- Docker Desktop instalado
- Docker Compose (incluido en Docker Desktop)

## 📦 Servicios incluidos

El `docker-compose.yml` incluye tres servicios:

1. **API Node.js** - Tu aplicación principal (Puerto 3000)
2. **MongoDB** - Base de datos (Puerto 27017) 
3. **Mongo Express** - Interfaz web para MongoDB (Puerto 8081)

## 🚀 Comandos rápidos

### Iniciar todos los servicios
```bash
docker-compose up -d
```

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Detener todos los servicios
```bash
docker-compose down
```

### Reiniciar servicios
```bash
docker-compose restart
```

### Reconstruir la imagen de la API
```bash
docker-compose up --build api
```

## 📊 Scripts NPM disponibles

```bash
npm run docker:build    # Construir imagen de la API
npm run docker:up       # Iniciar servicios
npm run docker:down     # Detener servicios
npm run docker:logs     # Ver logs
npm run docker:restart  # Reiniciar servicios
```

## 🌐 Puertos y acceso

| Servicio | URL | Puerto |
|----------|-----|--------|
| API | http://localhost:3000 | 3000 |
| MongoDB | mongodb://localhost:27017 | 27017 |
| Mongo Express | http://localhost:8081 | 8081 |

### Credenciales de acceso

**MongoDB:**
- Usuario: `admin`
- Contraseña: `password123`
- Base de datos: `productos_db`

**Mongo Express:**
- Usuario: `admin`
- Contraseña: `admin123`

## 🗄️ Datos iniciales

Al iniciar por primera vez, MongoDB se inicializa con:
- 5 productos de ejemplo
- Índices optimizados
- Usuario de aplicación configurado

## 🔧 Comandos útiles de Docker

### Ver contenedores ejecutándose
```bash
docker ps
```

### Ver logs de un servicio específico
```bash
docker-compose logs api
docker-compose logs mongodb
docker-compose logs mongo-express
```

### Ejecutar comandos dentro del contenedor de la API
```bash
docker-compose exec api sh
```

### Conectarse a MongoDB desde línea de comandos
```bash
docker-compose exec mongodb mongosh -u admin -p password123
```

### Ver volúmenes de Docker
```bash
docker volume ls
```

### Limpiar volúmenes (⚠️ Elimina todos los datos)
```bash
docker-compose down -v
```

## 🔍 Troubleshooting

### Problema: Puerto ocupado
Si el puerto 3000, 27017 o 8081 está ocupado:
1. Cambiar el puerto en `docker-compose.yml`
2. Actualizar las variables de entorno si es necesario

### Problema: Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs [servicio]

# Reconstruir imagen
docker-compose build --no-cache [servicio]
```

### Problema: Base de datos vacía
```bash
# Eliminar volúmenes y reiniciar
docker-compose down -v
docker-compose up -d
```

### Verificar salud de servicios
```bash
docker-compose ps
```

## 📝 Ejemplo de uso completo

```bash
# 1. Clonar/descargar el proyecto
cd E:\E_2025\APIS-NODEJS

# 2. Iniciar servicios
docker-compose up -d

# 3. Verificar que estén ejecutándose
docker-compose ps

# 4. Probar la API
curl http://localhost:3000/api/productos

# 5. Acceder a Mongo Express
# Abrir http://localhost:8081 en el navegador

# 6. Ver logs si hay problemas
docker-compose logs -f

# 7. Detener cuando termines
docker-compose down
```

## 🔄 Desarrollo con Docker

Para desarrollo, puedes montar el código como volumen:

```yaml
# Agregar en docker-compose.yml bajo el servicio 'api'
volumes:
  - .:/usr/src/app
  - /usr/src/app/node_modules
```

Esto permitirá que los cambios en el código se reflejen sin reconstruir la imagen.

## 🛡️ Consideraciones de seguridad

Para producción:
1. Cambiar todas las contraseñas
2. Usar variables de entorno para secretos
3. Configurar redes internas
4. Implementar SSL/TLS
5. Limitar acceso a Mongo Express

## 📚 Recursos adiciales

- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
