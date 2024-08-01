import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import DetalleProducto from './componentes/DetalleProducto';
import EditarProducto from './componentes/EditarProducto'; 

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos/:id" element={<DetalleProducto />} />
                <Route path="/productos/:id/edit" element={<EditarProducto />} />
            </Routes>
        </div>
    );
}

export default App;
