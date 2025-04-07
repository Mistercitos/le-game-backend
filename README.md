# Le Game - Tienda de videojuegos digitales

Proyecto final del curso Programación Backend II - Coderhouse.  
Aplicación backend con arquitectura profesional, autenticación por JWT, manejo de roles, carrito de compras, generación de tickets y más.

## Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- Passport JWT
- Bcrypt.js
- Nodemailer
- Dotenv
- Arquitectura por capas con DAO, DTO y Repository
- Roles y autorizaciones por middleware

## Estructura del proyecto

src/
├── config/
├── controllers/
├── dto/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
└── index.js

## Variables de entorno

Debes crear un archivo .env en la raíz del proyecto con el siguiente contenido (rellenar con tus valores reales):

PORT=3000  
MONGO_URI=tu_uri_de_mongodb  
JWT_SECRET=tu_clave_secreta  
EMAIL_USER=tu_correo  
EMAIL_PASS=tu_clave_o_app_password

También se incluye un archivo .env.example como referencia.

## Cómo iniciar el servidor

Instalar dependencias:

npm install

Iniciar el proyecto:

npm start

Servidor disponible en:  
http://localhost:3000

## Roles y permisos

Admin:
- Crear, actualizar y eliminar productos

User:
- Agregar productos al carrito
- Procesar compras

## Funcionalidades clave

- Registro, login y autenticación con JWT
- Recuperación de contraseña por correo
- Generación de ticket al finalizar compra
- Manejo de stock
- El carrito conserva los productos que no pudieron comprarse

## Autor

Christian Del Barrio  
Proyecto desarrollado para Coderhouse - Backend II
