"use client"
import React, { useState } from 'react';

export default function Page() {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <div className="flex">
            <button
                className="p-2 text-white bg-blue-500 rounded transition duration-300 ease-in-out hover:bg-blue-600"
                onClick={() => setMenuVisible(!menuVisible)}
            >
                {menuVisible ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>

            <div
                className={`transform transition-all ease-in-out duration-500 ${menuVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} w-64 bg-gradient-to-r from-blue-200 to-indigo-200 p-4 fixed inset-y-0 left-0 shadow-xl rounded-r-lg`}
            >
                <h3 className="font-bold mb-2">Marcas</h3>
                {/* Lista de marcas */}
                {/* ... */}
            </div>

            <div className="flex-grow p-4">
                {/* Contenido principal */}
            </div>
        </div>
    );
}
