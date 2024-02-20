import { useProductos } from '@/context/Context'
import React, { useState } from 'react'

export default function Checket() {
    const { isChecked, mostrarPrecio } = useProductos()


    return (
        // <label className="relative inline-flex items-center cursor-pointer">
        //     <input type="checkbox" value="" className="sr-only peer" checked={isChecked} // Bind state to checked attribute
        //         onChange={() => {
        //             mostrarPrecio()
        //         }} />
        //     <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        // </label>
        <p className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
            {isChecked ? (<i className="fa fa-eye" aria-hidden="true" onClick={mostrarPrecio}></i>) : (<i className="fa fa-eye-slash" aria-hidden="true" onClick={mostrarPrecio}></i>)}


        </p >
    )
}
