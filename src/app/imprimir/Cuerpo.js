"use client";
import React, { useEffect, useState } from 'react';
import Cardimprimir from '@/components/Cardimprimir';

export default function Cuerpo({ productos }) {
    const [mostrar, setMostrar] = useState(true);
    const [idsFiltrar, setIdsFiltrar] = useState(["100448", "100418", "100362", "100199", "100442", "100392", "100382", "100208", "100279"]);
    const [productosfiltrados, setProductosfiltrados] = useState([]);
    const [sku, setSku] = useState();

    function filtrar() {
        let productosnew = productos.filter(producto => idsFiltrar.includes(producto.id_producto));
        setProductosfiltrados(productosnew);
    }

    function agregar() {
        const nuevoArray = [...idsFiltrar, sku];
        setIdsFiltrar(nuevoArray);
    }


    return (
        <>
            {mostrar ? (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input type='text' value={sku} placeholder='sku' onChange={(e) => setSku(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2" />
                        <button onClick={agregar} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Agregar</button>
                    </div>
                    <div>
                        {idsFiltrar.map(row => (
                            <div key={row}>
                                <small >
                                    {row}
                                </small>
                                <button onClick={() => {
                                    const nuevoArray = idsFiltrar.filter((item) => item !== row);
                                    setIdsFiltrar(nuevoArray);
                                }} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Eliminar</button>
                                <br />
                            </div>
                        ))
                        }
                    </div >
                    <hr />
                    <button onClick={() => {
                        filtrar();
                        setMostrar(false);
                    }} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">filtrar</button>
                </div >
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-4">
                        {productosfiltrados.map((row, i) => (
                            <Cardimprimir key={i} producto={row} />
                        ))}
                    </div>
                    <button onClick={() => {

                        setMostrar(true);
                    }} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">regresar</button>
                </>
            )}
        </>
    );
}
