import { useProductos } from '@/context/Context';
import React, { useEffect, useState } from 'react'
import { loadFontAwesome } from '../services/fontawesome';

import 'photoswipe/dist/photoswipe.css';
//import 'photoswipe/dist/default-skin/default-skin.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css'; // Si estás usando PhotoSwipe v5

//nueva libreria imagen
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';



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
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#mi_galeria_' + producto.id_producto,
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    const verImg = () => {
        document.getElementById("imagen").click();
    }


    //   console.log('ssss', propiedadesFiltradas)

    /**
     * Nueva libreria de images
     */

    useEffect(() => {
        Fancybox.bind('#gallery-wrap-a [data-fancybox]', {
            wheel: 'slide',
        });

        Fancybox.bind('#gallery-wrap-b [data-fancybox]', {
            wheel: 'close',
        });
    }, []);

    return (

        <div id="default-modal" tabIndex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full scrollbar ">
            {/* <div id="default-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> */}
            {loadFontAwesome()}
            {/* <div className="relative p-4 w-full max-w-2xl max-h-full"> */}
            <div className="relative p-3 w-full ">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <div className="relative border-[#6EE3A0] bg-white  dark:bg-dark-800 rounded-3xl  shadow-lg"> */}

                    <div className="flex bg-gray-700 items-center justify-between p-3 md:p-4 border-b-[#d9f99d] rounded-t-3xl  dark:border-gray-600">
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


                                    {/* nueva img */}
                                    {/* <div>
                                        <div id="gallery-wrap-a" >
                                            <h1>Gallery #1</h1>
                                            <p>
                                                <a data-fancybox="gallery" data-src="https://lipsum.app/id/1/1024x768">
                                                    <img src="https://lipsum.app/id/1/200x150" />
                                                </a>
                                                <a data-fancybox="gallery" data-src="https://lipsum.app/id/2/1024x768">
                                                    <img src="https://lipsum.app/id/2/200x150" />
                                                </a>
                                                <a data-fancybox="gallery" data-src="https://lipsum.app/id/3/1024x768">
                                                    <img src="https://lipsum.app/id/3/200x150" />
                                                </a>
                                            </p>
                                        </div>
                                        <div id="gallery-wrap-b">
                                            <h1>Gallery #2</h1>
                                            <p>
                                                <a data-fancybox="gallery" data-src="https://lipsum.app/id/4/1024x768">
                                                    <img src="https://lipsum.app/id/4/200x150" />
                                                </a>
                                                <a data-fancybox="gallery" data-src="https://lipsum.app/id/5/1024x768">
                                                    <img src="https://lipsum.app/id/5/200x150" />
                                                </a>
                                                <a data-fancybox="gallery" data-src="https://lipsum.app/id/67/1024x768">
                                                    <img src="https://lipsum.app/id/6/200x150" />
                                                </a>
                                            </p>
                                        </div>
                                    </div> */}
                                    {/* <div id="gallery-wrap-a" class="grid grid-cols-3 gap-4 max-w-xl mx-auto p-10">
                                        <h1>Gallery #1</h1>

                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/60/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/60/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/61/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/61/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/62/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/62/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/63/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/63/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/64/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/64/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/65/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/65/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/66/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/66/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/67/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/67/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/68/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/68/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/69/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/69/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/70/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/70/200x150" />
                                        </a>
                                        <a data-fancybox="gallery" data-src="https://lipsum.app/id/71/1600x1200">
                                            <img class="rounded" src="https://lipsum.app/id/71/200x150" />
                                        </a>

                                    </div> */}
                                    {/* end nueva img */}


                                    {/* Parte izquierda: Imagen principal y thumbnails */}
                                    <div className="w-full h-full  flex items-center justify-center">

                                        <div id="gallery-wrap-a" class="grid grid-cols-3 gap-4 max-w-xl mx-auto p-10">

                                            {Object.values(producto.imagenes).slice(0, 12).map((imagen, i) => {
                                                if (imagen.cod_albumtipo == '1') {
                                                    return (<a data-fancybox="gallery" data-src={`https://multilaptops.net/${imagen.ruta_img}`}>
                                                        <img class="rounded shadow-sm" src={`https://multilaptops.net/${imagen.ruta_img}`} />
                                                    </a>)
                                                }
                                            }

                                            )}


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
                                                    "Serie de procesador",
                                                    "Generación del procesador (Intel)",
                                                    "Memoria RAM",
                                                    "Unidad de estado solido (SSD)",
                                                    "Disco duro (HDD)",
                                                    "Pantalla",
                                                    "Gráficos",
                                                ].map((cualidad, index) => {
                                                    // Filtrar primero para ver si hay datos válidos
                                                    const especificacionesFiltradas = Object.values(producto.especificacion).filter(row => row.cualidad === cualidad);

                                                    // Encuentra el primer ícono para esta cualidad
                                                    const iconoParaCualidad = especificacionesFiltradas.find(row => row.icono_tipocualidad)?.icono_tipocualidad;

                                                    // Verificar si hay al menos una especificación válida antes de imprimir
                                                    if (especificacionesFiltradas.length > 0) {
                                                        return (
                                                            <li key={index} className="pb-3 sm:pb-4">
                                                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                                    <div className="flex-shrink-0 text-center">
                                                                        {/* Renderizar el ícono solo si existe uno para esta cualidad */}
                                                                        {iconoParaCualidad && <i className={`fa ${iconoParaCualidad} rounded-full`}></i>}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                            {cualidad}
                                                                        </p>
                                                                        {especificacionesFiltradas.map((row, i) => (
                                                                            <p key={i} className="text-sm truncate dark:text-gray-400">
                                                                                {row.referencia_esp}
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })}
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
