
import { useProductos } from "@/context/Context";
import Link from "next/link";
function Card({ producto }) {
  const { precioGanacia, tipoMoneda, isChecked } = useProductos();

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
    <Link href={`/item/${producto.id_producto}`}>
      <div className="bg-white rounded-3xl border border-gray-50 h-full shadow-lg  ">
        {" "}
        {/* Ajustes visuales */}
        <img
          className="w-full h-48 object-contain rounded-t-xl" // Borde redondeado superior
          src={obtenerImagenUrl()}
          alt="Producto"
        />
        <div className="flex flex-col justify-between flex-grow w-full">
          <p className="mx-3 mt-1 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 text-left px-2 sm:px-4 md:px-6">
            {producto.nombre_marca} {producto.nombre_linea}{" "}
            {producto.id_producto}
          </p>
          <hr className="my-2"></hr>

          <div className="text-left w-full px-2 sm:px-4 md:px-6 mx-3">
            {/* Especificaciones del Producto */}
            {[
              "Procesador",
              "Memoria RAM",
              "Unidad de estado solido (SSD)",
              "Pantalla",
            ].map((cualidad, index) => (
              <div key={index}>
                <h6 className="text-xs sm:text-sm font-bold text-gray-900 mt-1 ">
                  {cualidad === "Unidad de estado solido (SSD)"
                    ? "estado solido (SSD)"
                    : cualidad}
                </h6>
                {Object.values(producto.especificacion).map((row, i) => {
                  return row.cualidad === cualidad ? (
                    <p key={i} className="text-gray-700">
                      {getFourWords(row.referencia_esp)}
                    </p>
                  ) : null;
                })}
              </div>
            ))}
            {/* Tus mapeos y lógica aquí */}
          </div>

          <div className="my-2 sm:my-3 md:my-4 flex flex-col items-center">
            {/* Precio y lógica aquí */}
            {isChecked ? (
              tipoMoneda == 1 ? (
                <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                  Bs{" "}
                  {(
                    Number(producto.costo_avg) * Number(producto.factor_avg) +
                    precioGanacia
                  ).toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                  Bs{" "}
                  {(
                    (Number(producto.costo_avg) + precioGanacia) *
                    Number(producto.factor_avg)
                  ).toFixed(2)}
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
