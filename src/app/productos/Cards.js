import React from 'react'

export default function Cards({ producto }) {

    const obtenerImagenUrl = () => {
        const imagen = Object.values(producto.imagenes).find(
            (row) => row.cod_albumtipo === "5"
        );
        return imagen
            ? `https://multilaptops.net/${imagen.ruta_img}`
            : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
    };
    return (
        <div className="w-full max-w-sm gb-gray-50  border border-gray-100 rounded-3xl shadow-md p-2">
            <div className="flex flex-col  p-2 ">
                <img className=" rounded-lg" src={obtenerImagenUrl()} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-semibold text-gray-700 dark:text-white"> {producto.nombre_linea == ' ' ? 'Laptops' : producto.nombre_linea}</h5>
                <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-3">
                    <b className=''>  {producto.nombre_marca}</b>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                        <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                    </svg>
                    <b className='text-[#0E9F6E]'> {producto.id_producto}</b>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                        <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                    </svg>
                    <p className=''>{producto.nombre_modelo}</p>
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-normal">
                    {producto.referencia_producto}
                </span>
                <div className="mt-2 sm:mt-3 md:mt-3 px-3 pb-3 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Bs 46677.00
                    </span>
                </div>
            </div>
        </div>
    )
}
