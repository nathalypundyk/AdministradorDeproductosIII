const express = require('express');
const cors = require('cors');
const routerProductos = require('./rutas/rutaProducto');
const app = express();

require('./configuracion/baseDeDatos');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routerProductos);

app.listen(8080, () => {
    console.log("El servidor se está ejecutando en el puerto 8080.");
});
