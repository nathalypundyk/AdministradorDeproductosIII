const mongoose = require('mongoose');

const ColeccionProductos = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

const Productos = mongoose.model('productos', ColeccionProductos); // Crea la colección o si ya existe la conecta con el objeto

module.exports = Productos;