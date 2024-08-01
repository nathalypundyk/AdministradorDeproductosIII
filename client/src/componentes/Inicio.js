import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoProducto = { titulo, precio, descripcion };

        try {
            await axios.post('http://localhost:8080/productos/agregar', nuevoProducto);
            alert('¡Producto Agregado!');
            fetchProductos(); 
            setTitulo('');
            setPrecio('');
            setDescripcion('');
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/productos/${id}`);
            alert('Producto Eliminado');
            fetchProductos(); 
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <li key={producto._id}>
                            <Link to={`/productos/${producto._id}`}>{producto.titulo}</Link>
                            <button onClick={() => navigate(`/productos/${producto._id}/edit`)}>Editar</button>
                            <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
                        </li>
                    ))
                ) : (
                    <li>No hay productos disponibles</li>
                )}
            </ul>

            <div className='formulario'>
                <h2>Agregar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título:</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    </div>
                    <button type="submit">Agregar Producto</button>
                </form>
            </div>
        </div>
    );
};

export default Inicio;
