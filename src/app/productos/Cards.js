import { useProductos } from "@/context/Context";
import React from "react";


export default function Cards({ producto }) {
  const { precioConfigurado, isChecked, setProducto, setVerproducto } = useProductos();
  const obtenerImagenUrl = () => {
    const imagen = Object.values(producto.imagenes).find(
      (row) => row.cod_albumtipo === "5"
    );
    return imagen
      ? `https://multilaptops.net/${imagen.ruta_img}`
      : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
  };
  return (
    <div className="max-w-md mx-auto bg-[#FBFBFC] border border-gray-100 rounded-3xl shadow-md flex flex-col p-4 dark:bg-dark-600 dark:border-dark-600">
      <div className="flex flex-col items-center">
        <img
          onClick={() => {

            setProducto(producto);
            setVerproducto(true);
          }}
          className="w-full max-w-xs rounded-lg object-cover"
          src={obtenerImagenUrl()}
          alt={`${producto.nombre_marca} image`}
        />
      </div>
      <div className="text-left">
        <h5 className="mb-1 text-xl font-semibold text-gray-700 dark:text-white">
          {producto.nombre_marca} {producto.id_producto}
        </h5>
      </div>
      <span
        className="text-sm md:text-md text-gray-600 dark:text-dark-400 mt-2 font-normal block overflow-hidden"
        style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}
        title={producto.referencia_producto}
      >
        {producto.referencia_producto}
      </span>


      {/* Asegúrese de que este div se alinee a la parte inferior del contenedor flex. */}
      <div className="mt-auto pt-3 pb-2 pe-0 w-full text-end">
        {isChecked ? (
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            {precioConfigurado(
              producto.factor_avg,
              producto.costo_avg,
              producto.precio_config
            )}
          </span>
        ) : null}
      </div>
    </div>

  );
}
