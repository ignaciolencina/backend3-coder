# 🎭 API de Adopción de Mascotas

Una API completa para gestionar un sistema de adopción de mascotas construida con Node.js, Express, MongoDB y Faker.js para generación de datos de prueba.

> [!NOTE]
> Debe usarse el comando de `npm run dev` para levantar el puerto, no se utilizó nodemon.

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos

# Servidor
PORT=5050
NODE_ENV=development
```

## 🐳 Docker

[Link al repositorio de DockerHub](https://hub.docker.com/repository/docker/ignaciolencina/adoptme-api-image/general)



### Usando Docker Compose

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con información detallada
npm test -- --reporter spec

# Ejecutar tests específicos
npx mocha test/adoption.test.js
```


## 📚 Documentación con Swagger

Una vez que la aplicación esté ejecutándose, la documentación interactiva estará disponible en:

```
http://localhost:5050/api-docs
```

La documentación incluye:
- 📋 Especificaciones completas de todos los endpoints
- 🔧 Ejemplos de peticiones y respuestas
- 📝 Modelos de datos
- 🧪 Interfaz para probar los endpoints directamente

## 🛠 Endpoints Disponibles

### 1. GET `/api/mocks/mockingpets`
**Genera mascotas de prueba sin insertar en la base de datos**

```http
GET /api/mocks/mockingpets?quantity=10
```

#### Parámetros de consulta:
- `quantity` (opcional): Número de mascotas a generar. Por defecto: 50

#### Ejemplo de respuesta:
```json
{
  "status": "success",
  "message": "Generated 10 mock pets using Faker",
  "payload": [
    {
      "name": "Luna",
      "specie": "Dog",
      "birthDate": "2022-03-15T00:00:00.000Z",
      "adopted": false,
      "image": "https://picsum.photos/640/480?category=animals"
    }
  ]
}
```

---

### 2. GET `/api/mocks/mockingusers`
**Genera usuarios de prueba sin insertar en la base de datos**

```http
GET /api/mocks/mockingusers?quantity=5
```

#### Parámetros de consulta:
- `quantity` (opcional): Número de usuarios a generar. Por defecto: 50

#### Ejemplo de respuesta:
```json
{
  "status": "success",
  "message": "Generated 5 mock users using Faker",
  "payload": [
    {
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan.perez@gmail.com",
      "password": "$2b$10$encrypted_password_hash",
      "role": "user",
      "pets": []
    }
  ]
}
```

---

### 3. POST `/api/mocks/generateData`
**Genera e inserta datos directamente en la base de datos**

```http
POST /api/mocks/generateData
Content-Type: application/json

{
  "users": 10,
  "pets": 20
}
```

#### Cuerpo de la petición:
```json
{
  "users": 10,    // Número de usuarios a generar e insertar (opcional)
  "pets": 20      // Número de mascotas a generar e insertar (opcional)
}
```

#### Ejemplo de respuesta:
```json
{
  "status": "success",
  "message": "Successfully inserted 10 users and 20 pets into database using Faker",
  "payload": {
    "usersInserted": 10,
    "petsInserted": 20,
    "insertedUsers": [...],  // Array con los usuarios insertados
    "insertedPets": [...]    // Array con las mascotas insertadas
  }
}
```

---