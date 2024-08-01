import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/productos/${id}`);
                setProducto(response.data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProducto();
    }, [id]);

    const eliminarProducto = async () => {
        try {
            await axios.delete(`http://localhost:8080/productos/${id}`);
            alert('Producto Eliminado');
            navigate('/'); 
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    if (!producto) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalle del Producto</h2>
            <h3>{producto.titulo}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>Descripción: {producto.descripcion}</p>
            <button onClick={() => navigate(`/productos/${producto._id}/edit`)}>Editar</button>
            <button onClick={eliminarProducto}>Eliminar</button>
        </div>
    );
};

export default DetalleProducto;
