import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/productos/${id}`);
                const producto = response.data;
                setTitulo(producto.titulo);
                setPrecio(producto.precio);
                setDescripcion(producto.descripcion);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProducto();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productoActualizado = { titulo, precio, descripcion };

        try {
            await axios.put(`http://localhost:8080/productos/${id}`, productoActualizado);
            alert('¡Producto Actualizado!');
            navigate(`/productos/${id}`);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    return (
        <div>
            <h2>Editar Producto</h2>
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
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditarProducto;
