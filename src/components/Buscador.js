'use client'
import { useProductos } from '@/context/Context';
import React, { useEffect, useRef, useState } from 'react'
import lunr from 'lunr';
import FlexSearch from 'flexsearch';

export default function Buscador() {
    const [searchTerm, setSearchTerm] = useState('');
    const { productos, filtrar } = useProductos();
    const [busqueda, setBusqueda] = useState('');



    // const handleSearchChange = (e) => {
    //     const term = e.target.value.toLowerCase();

    //     console.log('Busqueda', term)
    //     setSearchTerm(term);
    //     ///oficial con luna/////
    //     var idx = lunr(function () {
    //         this.ref('id_producto')
    //         this.field('id_producto')
    //         this.field('nombre_marca')
    //         this.field('nombre_modelo')
    //         this.field('descripcion_producto')

    //         productos.forEach(function (doc) {
    //             this.add(doc)
    //         }, this)
    //     })
    //     // console.log(productos)
    //     // console.log(idx.search(term))
    //     const idproductos = idx.search(term)
    //     const productosAMostrar = idproductos.map((row) => {
    //         return productos.find(producto => producto.id_producto === row.ref)
    //     })
    //     // console.log('productos', productosAMostrar)
    //     filtrar(productosAMostrar)
    //     /////1 opcion
    //     // if (!term) {
    //     //     filtrar(productos);
    //     // } else {
    //     //     const filtered = productos.filter((product) =>
    //     //         Object.values(product).some(value =>
    //     //             value && typeof value === 'string' && value.toLowerCase().includes(term)
    //     //         )
    //     //     );
    //     //     filtrar(filtered);
    //     // }
    // };

    // async function buscaProducto() {
    //     const busqueda = e.target.value.toLowerCase();
    //     console.log(busqueda);

    //     if (busqueda.length > 0) {
    //         const productosDatos = productos

    //         // Crear un nuevo índice con FlexSearch
    //         const index = new FlexSearch.Index({
    //             // Configura tu índice según necesites
    //             tokenize: "forward",
    //         });

    //         // Asegúrate de que estás utilizando el método correcto para añadir documentos al índice
    //         productosDatos.forEach((producto) => {
    //             // Aquí asumimos que `producto.id_producto` existe y es único
    //             // y que concatenamos los campos de interés en un solo string para la indexación
    //             index.add(producto.id_producto, `${producto.id_producto} ${producto.nombre_marca} ${producto.nombre_linea} ${producto.nombre_modelo} ${producto.referencia_producto}`);
    //         });

    //         // Realizar la búsqueda
    //         const resultadosIds = index.search(busqueda, {
    //             // Configura las opciones de búsqueda según necesites
    //         });

    //         // Filtrar los productosDatos basándonos en resultadosIds
    //         const coincidencias = resultadosIds.map(id => productosDatos.find(p => p.id_producto == id));

    //         if (coincidencias.length > 0) {
    //             console.log('Existe coincidencias', coincidencias);
    //             pintarProductos(coincidencias);
    //             // Implementa aquí la lógica para mostrar las coincidencias en la UI
    //         } else {
    //             console.log('No hay coincidencias');
    //             const contenedor = document.querySelector('#resultadosBusqueda');
    //             contenedor.innerHTML = '';

    //             const elemento =
    //                 elem("li", { "class": "list-group-item" }, [
    //                     elem("i", { "class": "fa fa-search pe-1" }),
    //                     "No se encontraron productos."
    //                 ])

    //             contenedor.appendChild(elemento);
    //         }
    //     } else {
    //         console.log('La búsqueda está vacía, no se realiza la acción.');
    //     }
    // }


    useEffect(() => {
        if (busqueda.length > 0) {
            const productosDatos = productos;

            // Crear un nuevo índice con FlexSearch
            const index = new FlexSearch.Index({
                tokenize: "forward",
            });

            productosDatos.forEach((producto) => {
                index.add(producto.id_producto, `${producto.id_producto} ${producto.nombre_marca} ${producto.nombre_linea} ${producto.nombre_modelo} ${producto.referencia_producto}`);
            });

            // console.log(productosDatos)

            // Realizar la búsqueda
            const resultadosIds = index.search(busqueda, {
                // Configura las opciones de búsqueda según necesites
            });

            // Filtrar los productosDatos basándonos en resultadosIds
            const coincidencias = resultadosIds.map((id) => productosDatos.find((p) => p.id_producto === id));

            if (coincidencias.length > 0) {
                console.log('si hay productos')
                filtrar(coincidencias);
            } else {
                filtrar([])
                console.log('no hay productos')
            }


        }
    }, [busqueda]);

    const limpiar = () => {
        console.log(' borrar')
        setBusqueda('')
    }

    return (



        <div className="relative">
            <div className="flex items-center border-2 border-gray-300 bg-white h-10 rounded-lg">
                {/* <SearchIcon className="h-5 w-5 text-gray-500 ml-4" /> */}
                <i className="fas fa-search h-5 w-5 text-gray-500 ml-4" aria-hidden="true"></i>
                <input
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
                    type="text"
                    className="pl-2 outline-none border-none bg-transparent flex-1"
                    placeholder="Buscar..."
                />
                {busqueda && (
                    <button onClick={() => setBusqueda('')} className="pr-4">
                        x{/* <XIcon className="h-5 w-5 text-gray-500" /> */}
                    </button>
                )}
            </div>
        </div>


    )
}
