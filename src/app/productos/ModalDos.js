import { useProductos } from '@/context/Context';
import React, { useEffect, useState } from 'react'
import { loadFontAwesome } from '../services/fontawesome';

import 'photoswipe/dist/photoswipe.css';
//import 'photoswipe/dist/default-skin/default-skin.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css'; // Si estás usando PhotoSwipe v5




export default function ModalDos() {
    const { producto, tipoMoneda, isChecked, precioGanacia, setVerproducto, precioConfigurado } = useProductos()

    console.log(producto)
    const obtenerImagenUrl = () => {
        const imagen = Object.values(producto.imagenes).find(
            (row) => row.cod_albumtipo === "5"
        );
        return imagen
            ? `https://multilaptops.net/${imagen.ruta_img}`
            : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
    };

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#mi-galeria',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => lightbox.destroy();
    }, []);

    const verImg = () => {
        document.getElementById("imagen").click();
    }

    return (

        <div id="default-modal" tabIndex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full scrollbar ">
            {/* <div id="default-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> */}
            {loadFontAwesome()}
            {/* <div class="relative p-4 w-full max-w-2xl max-h-full"> */}
            <div className="relative p-3 w-full ">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <div className="relative border-[#6EE3A0] bg-white  dark:bg-dark-800 rounded-3xl  shadow-lg"> */}

                    <div className="flex bg-[#22C55E] items-center justify-between p-3 md:p-4 border-b-[#d9f99d] rounded-t-3xl  dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-100 dark:text-white ">
                            {producto.id_producto}
                        </h3>
                        <button onClick={() => setVerproducto(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="">
                        {/* cuerpo */}
                        <div className=" ">
                            <div className="container">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1">

                                    {/* Parte izquierda: Imagen principal y thumbnails */}
                                    <div className="w-full h-full  flex items-center justify-center">

                                        {/* imagen grande */}
                                        <img src={obtenerImagenUrl()} onClick={verImg} alt='' className="mx-auto " />

                                        {/* Miniaturas que estan ocultos */}
                                        <div id="mi-galeria" className="hidden p-4">

                                            {Object.values(producto.imagenes).map((imagen, index) => (

                                                <a href={`https://multilaptops.net/${imagen.ruta_img}`} id='imagen' data-pswp-width="1200" data-pswp-height="900" target="_blank" key={index} className="hover:opacity-75  ">
                                                    <img src={`https://multilaptops.net/${imagen.ruta_img}`} alt={`Imagen ${index + 1}`} className="rounded-lg shadow-sm " />
                                                </a>

                                            ))}
                                        </div>

                                    </div>

                                    {/* Parte derecha: Detalles del producto */}
                                    <div className="p-7">
                                        <div className='grid grid-cols-2'>
                                            {/* Rating y precio */}
                                            <div className="text-left">
                                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white">
                                                    {producto.nombre_marca} {producto.id_producto}
                                                </h5>
                                            </div>

                                        </div>

                                        <div className="pb-2">
                                            <div className="text-sm">{producto.referencia_producto}</div>
                                        </div>

                                        {/* Opciones del producto */}
                                        <div className="my-1">
                                            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                                {[
                                                    "Procesador",
                                                    "Memoria RAM",
                                                    "Unidad de estado solido (SSD)",
                                                    "Pantalla",
                                                    "Gráficos",
                                                ].map((cualidad, index) => (
                                                    <li key={index} className="pb-3 sm:pb-4">
                                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                            <div className="flex-shrink-0 text-center">
                                                                {Object.values(producto.especificacion).map((row, i) => {
                                                                    if (row.cualidad === cualidad && row.icono_tipocualidad) {
                                                                        return (
                                                                            <i
                                                                                key={i}
                                                                                className={`fa ${row.icono_tipocualidad} w-10 h-10 rounded-full`}
                                                                            ></i>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {cualidad}
                                                                </p>
                                                                {Object.values(producto.especificacion).map((row, i) => {
                                                                    if (row.cualidad === cualidad) {
                                                                        return (
                                                                            <p key={i} className="text-sm truncate dark:text-gray-400">
                                                                                {row.referencia_esp}
                                                                            </p>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>

                                        <div className="mt-auto pt-3 pb-2 pe-0 w-full text-end">

                                            {isChecked ? (

                                                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {precioConfigurado(producto.factor_avg, producto.costo_avg, producto.precio_config)}
                                                </span>
                                            ) : null}
                                        </div>


                                        {/* Botones de acción */}
                                        <div className="flex items-center justify-center mt-3">
                                            <button onClick={() => setVerproducto(false)} className="px-8 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end cuerpo */}
                    </div>


                </div>
            </div>
        </div >




    )
}
