"use client"
import React, { useState } from 'react'

export default function page() {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className="flex">
      {/* Botón para mostrar/ocultar el menú */}
      <button
        className="p-2 text-white bg-blue-500"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        {menuVisible ? 'Ocultar Filtros' : 'Mostrar Filtros'}
      </button>

      {/* Menú de filtros */}
      <div
        className={`transform transition-transform ${menuVisible ? 'translate-x-0' : '-translate-x-full'
          } w-64 bg-gray-200 p-4 fixed inset-y-0 left-0`}
      >
        {/* Contenido del menú */}
        <h3 className="font-bold mb-2">Marcas</h3>
        {/* Lista de marcas */}
        {/* ... */}
      </div>

      {/* Contenido principal */}
      <div className="flex-grow p-4">
        {/* Aquí va el contenido principal de la página */}
      </div>
    </div>
  )
}
