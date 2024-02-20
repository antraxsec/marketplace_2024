'use client'
import { useProductos } from '@/context/Context';
import React, { useEffect, useRef, useState } from 'react'

export default function Buscador({ verBuscador }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { productos, filtrar } = useProductos();
    const inputRef = useRef(null);



    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (!term) {
            filtrar(productos);
        } else {
            const filtered = productos.filter((product) =>
                Object.values(product).some(value =>
                    value && typeof value === 'string' && value.toLowerCase().includes(term)
                )
            );
            filtrar(filtered);
        }
    };

    return (
        <form onSubmit={verBuscador} className="flex items-center ">


            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                    </svg>
                </div>
                <input value={searchTerm} ref={inputRef} // Asigna la referencia aquí
                    onChange={handleSearchChange} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." />
                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                    </svg>
                </button>
            </div>

        </form>
    )
}
