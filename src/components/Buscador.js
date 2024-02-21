'use client'
import { useProductos } from '@/context/Context';
import React, { useEffect, useRef, useState } from 'react'
import lunr from 'lunr';

export default function Buscador({ verBuscador }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { productos, filtrar } = useProductos();
    const inputRef = useRef(null);



    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();

        console.log('Busqueda', term)
        setSearchTerm(term);
        ///oficial con luna/////
        var idx = lunr(function () {
            this.ref('id_producto')
            this.field('id_producto')
            this.field('nombre_marca')
            this.field('nombre_modelo')
            this.field('descripcion_producto')

            productos.forEach(function (doc) {
                this.add(doc)
            }, this)
        })
        // console.log(productos)
        // console.log(idx.search(term))
        const idproductos = idx.search(term)
        const productosAMostrar = idproductos.map((row) => {
            return productos.find(producto => producto.id_producto === row.ref)
        })
        // console.log('productos', productosAMostrar)
        filtrar(productosAMostrar)
        /////1 opcion
        // if (!term) {
        //     filtrar(productos);
        // } else {
        //     const filtered = productos.filter((product) =>
        //         Object.values(product).some(value =>
        //             value && typeof value === 'string' && value.toLowerCase().includes(term)
        //         )
        //     );
        //     filtrar(filtered);
        // }
    };

    return (
        <form onSubmit={verBuscador} className="flex items-center ">


            <div className="relative w-full">
                {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                    </svg>
                </div> */}
                <input value={searchTerm} ref={inputRef} // Asigna la referencia aquí
                    onChange={handleSearchChange} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." />
                <button onClick={() => setSearchTerm('')} type="button" className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-900">
                    x
                </button>
            </div>

        </form>
    )
}
