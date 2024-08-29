# Gestión de Productos y Categorías

Este proyecto es una aplicación web para la gestión de productos y categorías, construida con Node.js, Express, MySQL para el backend y React para el frontend. 

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, MySQL
- **Frontend**: React, PrimeReact
- **Herramientas de Desarrollo**: Axios, Nodemon

## Descripción

Esta aplicación permite realizar las siguientes operaciones:
- **Productos**: Crear, leer, actualizar y eliminar productos.
- **Categorías**: Crear, leer, actualizar y eliminar categorías.


## Capturas

### Categorias
![alt text](images/categories.png)

### Productos
![alt text](images/products.png)

## Instalación

- Clonar el repositorio
```bash
git clone https://github.com/sebgh0/CRUD-Productos.git
```
- Ubicarse directorio `CRUD-Productos`.
  
### Iniciar la api-rest

-  Ubicarse en el directorio de la api
```bash
cd api-rest
```
- Instalar dependencias.
```bash
npm install
```

- Ejecutar en modo desarrollo
```bash
npm run dev
```
- Alternativamente puede ejecutar:
```bash
npm start
```

* La API estará disponible en:
  
  `http://localhost:3001/api/v1/categories`

  `http://localhost:3001/api/v1/products`


`Nota:` La API se conecta a MySQL. Modifica las credenciales en el archivo .env para configurar la conexión a la base de datos.

### Iniciar la aplicación web
- Ubicarse en el directorio
```bash
cd app-gestor-productos
```
- Instalar dependencias.
```bash
npm install
```
- Ejecutar la aplicación
```bash
npm start
```
