import ImageLoader from "@/app/item/ImageLoader";
import { useProductos } from "@/context/Context";
import Link from "next/link";
function Card({ producto }) {
  const { precioGanacia, precioVisible, isChecked } = useProductos();

  const obtenerImagenUrl = () => {
    const imagen = Object.values(producto.imagenes).find(
      (row) => row.cod_albumtipo === "5"
    );
    return imagen
      ? `https://multilaptops.net/${imagen.ruta_img}`
      : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
  };

  /**
   * para mostrar solo 4 palbras
   */
  function getFourWords(paragraph) {
    const words = paragraph.split(" ");
    const firstFourWords = words.slice(0, 4);
    return firstFourWords.join(" ");
  }

  return (
    <div className="mx-3 my-4 bg-gray-100  rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center p-2 sm:max-w-sm h-[500px] card-hover">
      <Link href={`/item/${producto.id_producto}`}>
        <img
          className="w-full h-48 object-contain sombra-png"
          src={obtenerImagenUrl()}
          alt="Producto"
        />
        {/* <ImageLoader
          className="w-full mt-1 object-cover h-48 sm:h-48 md:h-64 lg:h-auto"
          src={obtenerImagenUrl()}
          alt="Laptop"
        /> */}
      </Link>
      <div className="flex flex-col justify-between flex-grow w-full">
        <p className="mt-1 text-lg font-bold tracking-tight text-gray-900 sm:text-xl text-center ">
          {producto.nombre_linea || "Laptops"}
        </p>
        <span className="font-medium text-gray-500 text-xs ml-5">
          {producto.nombre_marca} SKU:{producto.id_producto}


          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>

          </div>

        </span>
        {/* <small className="absolute top-5 left-4 text-xs font-bold bg-gray-900 p-1 text-white rounded">
          {producto.nombre_marca}
        </small> */}

        <div className="text-left w-full px-4 sm:px-10">
          {/* <small className="my-3 top-5 left-4 text-xs font-bold ">
            {producto.nombre_marca} SKU:{producto.id_producto}
          </small> */}
          {/* Especificaciones del Producto */}
          {[
            "Procesador",
            "Memoria RAM",
            "Unidad  solido (SSD)",
            "Pantalla",
          ].map((cualidad, index) => (
            <div key={index}>
              <h6 className="text-xs sm:text-sm font-bold text-gray-900 mt-2">
                {cualidad}
              </h6>
              {Object.values(producto.especificacion).map((row, i) => {
                return row.cualidad === cualidad ? (
                  <p key={i} className="text-xxs sm:text-xs text-gray-700">
                    {getFourWords(row.referencia_esp)}
                  </p>
                ) : null;
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-col items-center">
          {isChecked ? (
            <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
              Bs{" "}
              {(
                (Number(producto.costo_avg) + precioGanacia) *
                Number(producto.factor_avg)
              ).toFixed(2)}
            </span>
          ) : null}



          <span className="font-medium text-gray-500 text-xs ">
            {producto.nombre_marca} SKU:{producto.id_producto}


          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
