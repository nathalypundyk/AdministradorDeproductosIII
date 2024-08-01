const Productos = require('../modelos/modeloProductos');

module.exports.todosLosProductos = (req, res) => {
    Productos.find()
        .then((listaProductos) => {
            return res.status(200).json(listaProductos);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

module.exports.obtenerProductoPorId = (req, res) => {
    const { id } = req.params;

    Productos.findById(id)
        .then((producto) => {
            if (!producto) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
            return res.status(200).json(producto);
        })
        .catch((error) => res.status(400).json(error));
};

module.exports.agregarProducto = (req, res) => {
    const { titulo, precio, descripcion } = req.body;

    if (!titulo || !precio || !descripcion) {
        res.statusMessage = 'Por favor proporcionar todos los campos';
        return res.status(406).json({ mensaje: 'Por favor proporcionar todos los campos' });
    }

    Productos.create(req.body)
        .then((nuevoProducto) => {
            return res.status(201).json(nuevoProducto);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

module.exports.actualizarProducto = (req, res) => {
    const { id } = req.params;

    Productos.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((productoActualizado) => {
            if (!productoActualizado) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
            return res.status(200).json(productoActualizado);
        })
        .catch((error) => res.status(400).json(error));
};

module.exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    Productos.findByIdAndDelete(id)
        .then((productoEliminado) => {
            if (!productoEliminado) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
            return res.status(200).json({ mensaje: 'Producto eliminado' });
        })
        .catch((error) => res.status(400).json(error));
};
