import { useProductos } from "@/context/Context";
import Link from "next/link";

function Card({ producto }) {
  const { precioGanacia, tipoMoneda, isChecked, setProducto, setVerproducto, precioConfigurado } = useProductos();

  const obtenerImagenUrl = () => {
    const imagen = Object.values(producto.imagenes).find(
      (row) => row.cod_albumtipo === "5"
    );
    return imagen
      ? `https://multilaptops.net/${imagen.ruta_img}`
      : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
  };


  return (
    // <Link href={`/item/${producto.id_producto}`}>
    <div onClick={() => {
      setProducto(producto)
      setVerproducto(true)
    }
    } className="flex flex-col bg-white rounded-3xl border border-gray-50 h-full shadow-lg" >
      <img
        className="w-full h-48 object-contain rounded-t-xl"
        src={obtenerImagenUrl()}
        alt="Producto"
      />
      <div className="flex-grow flex flex-col justify-between">
        <div className="ml-3">

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white "> {producto.nombre_linea == ' ' ? 'Laptops' : producto.nombre_linea}</h5>
          <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
            <b>  {producto.nombre_marca}</b>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
              <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
            </svg>
            {producto.id_producto}
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
              <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
            </svg>
            {producto.nombre_modelo}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ">{producto.referencia_producto}</span>
        </div>
        <div className="mt-2 sm:mt-3 md:mt-4 px-3 pb-3 text-right">

          {isChecked ? (
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {precioConfigurado(producto.factor_avg, producto.costo_avg, producto.precio_config)}
            </span>
          ) : null}

          {/* Precio y lógica aquí */}

        </div>
      </div>
    </div >
    // </Link>
  );
}

export default Card;
