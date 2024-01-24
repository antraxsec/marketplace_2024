"use client"
import React from 'react'
import ProductSearch from './ProductSearch'
import { useProductos } from '@/context/Context'

export default function page() {


    return (
        <div className="container mx-auto p-4">
            <ProductSearch />
        </div>
        // <div>
        //     <div class="grid gap-6 mb-6 md:grid-cols-2">
        //         <label class="relative inline-flex items-center me-5 cursor-pointer">
        //             <input type="checkbox" value="" class="sr-only peer" checked />
        //             <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
        //             <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Mostrar Precio</span>
        //         </label>
        //     </div>



        // </div>
    )
}
