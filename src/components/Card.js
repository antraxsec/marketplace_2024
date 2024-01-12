import ImageLoader from "@/app/item/ImageLoader";
import { useProductos } from "@/context/Context";
import Link from "next/link";
function Card({ producto }) {

  const { precioGanacia } = useProductos()
  const obtenerImagenUrl = () => {
    const imagen = Object.values(producto.imagenes).find(row => row.cod_albumtipo === "5");
    return imagen ? `https://multilaptops.net/${imagen.ruta_img}`
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
    <div className="mx-3 my-4 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center p-2 sm:max-w-sm"

    >
      <Link href={`/item/${producto.id_producto}`}>
        <img
          className="w-full mt-1 object-cover h-48 sm:h-48 md:h-64 lg:h-auto"
          src={obtenerImagenUrl()}
          alt="Laptop"
        />
        {/* <ImageLoader
          className="w-full mt-1 object-cover h-48 sm:h-48 md:h-64 lg:h-auto"
          src={obtenerImagenUrl()}
          alt="Laptop"
        /> */}
      </Link>
      <p className="mt-1 text-lg font-bold tracking-tight text-gray-900 sm:text-xl ">
        {producto.nombre_linea}
      </p>
      <small className="absolute top-5 left-4 text-xs font-bold bg-gray-900 p-1 text-white rounded"> {producto.nombre_marca}</small>

      <div className="text-left w-full px-4 sm:px-10 mt-3">
        {/* Especificaciones del Producto */}
        {['Procesador', 'Memoria RAM', 'Unidad  solido (SSD)', 'Pantalla'].map((cualidad, index) => (
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
        <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-2">
          Bs {((Number(producto.costo_avg) + precioGanacia) * Number(producto.factor_avg)).toFixed(2)}
        </span>

        {/* <span className="text-sm font-medium text-gray-500 line-through">
          Bs {(Number(producto.costo_avg) * Number(producto.factor_avg)).toFixed(2)}
        </span> */}

      </div>

    </div>
  );
}

export default Card;




