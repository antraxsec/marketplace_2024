import { loadFontAwesome } from '@/app/services/fontawesome';
import { useProductos } from '@/context/Context';
import React, { useEffect, useState } from 'react'


export default function Modal() {
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



    // const [lightboxOpen, setLightboxOpen] = useState(false);
    // const [currentImage, setCurrentImage] = useState(0);
    // Adaptamos obtenerImagenUrls para devolver todas las URLs de las imágenes
    // const obtenerImagenUrls = () => {
    //     // Asegúrate de que producto.imagenes es un array o conviértelo en uno.
    //     return Object.values(producto.imagenes).map((imagen) =>
    //         `https://multilaptops.net/${imagen.ruta_img}`
    //     );
    // };

    // Array de URLs de las imágenes
    // const [imageUrls, setImageUrls] = useState([])
    // useEffect(() => {
    //     setImageUrls(obtenerImagenUrls())
    // }, [])

    // Función para manejar el clic en las miniaturas
    // const handleThumbnailClick = (index) => {
    //     setCurrentImage(index);
    //     setLightboxOpen(true);
    // };

    return (

        <div id="default-modal" tabIndex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full scrollbar">
            {loadFontAwesome()}
            <div className="relative p-4 w-full  ">

                <div className="relative border bg-white  dark:bg-gray-700 rounded-3xl  shadow-lg">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                                    <div className="w-full h-full">
                                        <img src={obtenerImagenUrl()} alt='holas comoetas' className="mx-auto" />

                                        {/* Miniaturas */}
                                        {/* <div className="flex overflow-x-scroll mt-4">
                                            {imageUrls.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`Thumbnail ${index}`}
                                                    className="mx-2 w-24 h-24 object-cover cursor-pointer"
                                                    onClick={() => handleThumbnailClick(index)}
                                                />
                                            ))}
                                        </div> */}
                                        {/* Lightbox */}
                                        {/* {lightboxOpen && (
                                            <ReactImageLightbox
                                                mainSrc={imageUrls[currentImage]}
                                                nextSrc={imageUrls[(currentImage + 1) % imageUrls.length]}
                                                prevSrc={imageUrls[(currentImage + imageUrls.length - 1) % imageUrls.length]}
                                                onCloseRequest={() => setLightboxOpen(false)}
                                                onMovePrevRequest={() =>
                                                    setCurrentImage((currentImage + imageUrls.length - 1) % imageUrls.length)
                                                }
                                                onMoveNextRequest={() =>
                                                    setCurrentImage((currentImage + 1) % imageUrls.length)
                                                }
                                            />
                                        )} */}





                                    </div>

                                    {/* Parte derecha: Detalles del producto */}
                                    <div className="p-7">
                                        <h2 className="text-xl md:text-2xl font-bold">{producto.nombre_linea}</h2>
                                        {/* Rating y precio */}
                                        <div className="mt-4">
                                            <span className="text-green-500">{producto.nombre_marca} {producto.nombre_modelo}</span>
                                        </div>
                                        <div className="my-4">

                                            <div className="text-sm">{producto.referencia_producto}</div>
                                        </div>

                                        {/* Opciones del producto */}
                                        <div className="my-4">
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
                                                            <div className="flex-shrink-0">
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
                                                                            <p key={i} className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                                {row.referencia_esp}
                                                                            </p>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </div>
                                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                ✅
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>


                                        {/* Botones de acción */}
                                        <div className="flex items-center  mt-4">
                                            {/* <button className="px-8 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">Add to Cart</button>
                                            <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                                <i className="far fa-heart"></i>
                                            </button> */}
                                            <div className="text-xl md:text-2xl font-semibold mb-2 ">
                                                {isChecked ? (

                                                    <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                                                        {precioConfigurado(producto.factor_avg, producto.costo_avg, producto.precio_config)}
                                                    </span>

                                                ) : null}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end cuerpo */}
                    </div>


                </div>
            </div>
        </div>




    )
}
