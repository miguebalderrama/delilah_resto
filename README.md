# Backend "Delilah Restó", App de pedidos de comida

Trabajo #3 del curso de Desarrollo Web Full Stack de Acámica.

## Recursos y tecnologías utilizadas

- Node.js
- Nodemon
- Express
- JWT para autenticación via Token
- MySQL
- Sequelize
- Postman para manejo de endpoints y testing
- Swagger para documentación de API

El objetivo del trabajo es generar el backend de una app de pedidos de comida llamada Delilah Restó, generando la arquitectura, bases de datos relacionales, endpoints funcionales y documentación.

## Documentación de la API

Abrir el archivo `api-docs.yaml` y copiar su contenido en [Swagger](https://editor.swagger.io/) o importar el mismo desde las opciones

Se listarán los endpoints y métodos disponibles y la información necesaria para hacer uso de los mismos

## Instalación e inicializacion del proyecto

### 1 - Clonar proyecto

Clonar el repositorio desde el [siguiente link](https://github.com/miguebalderrama/delilah_resto.git).

Desde la consola con el siguiente link:

`git clone https://github.com/miguebalderrama/delilah_resto.git .`

### 2 - Instalación de dependencias

```
npm install
```

### 3 - Creando base de datos

- Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el `3306`
- Inicializar los servicios de Apache y MySQL
- Abrir el panel de control del servicio MySQL
- Generar una nueva base de datos llamada `delilah_resto` desde el panel de control
- Abrir el archivo en `/database/queries.sql` y dentro del `panel de control` de la base de datos ejecutar la serie de queries del archivo o importar el mismo.

### 4 - Iniciando el servidor

Abrir el archivo en `/server/server.js` desde node

`node server`

### 5 - Listo para usar!

Testear los endpoints provistos desde postman para poder hacer uso de la API y base de datos generadas

[Colección de Postman](url de postaman..................)

(Asegurarse de seleccionar el entorno de desarrollo `Delilah Restó` para poder acceder a las variables globales
Se puede crear su usuario desde login.
El usuario admin por defecto es "username": "admin", "password": "123456"

