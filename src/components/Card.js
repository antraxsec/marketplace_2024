function Card({ producto }) {
  return (
    <div className="mx-3 my-4 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center p-2  sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl "
      style={{ transform: 'scale(0.9)' }}
    >
      <img
        className=" w-full mt-1 object-cover h-48 sm:h-48  md:h-64  lg:h-auto"
        src={
          Object.values(producto.imagenes).length === 0
            ? `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`
            : Object.values(producto.imagenes).find((row) => row.cod_albumtipo == "5")
              ? `https://multilaptops.net/${Object.values(producto.imagenes).find(
                (row) => row.cod_albumtipo == "5"
              ).ruta_img}`
              : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`
        }
        alt="Laptop"
      />

      <h5 className="mt-4 text-lg font-bold tracking-tight text-gray-900 sm:text-xl md:text-2xl">
        {producto.nombre_linea} - {producto.nombre_marca}
      </h5>

      <div className="text-left w-full px-10 mt-3 ">
        {/* Especificaciones del Producto */}
        {['Procesador', 'Memoria RAM', 'Unidad de estado solido (SSD)', 'Pantalla'].map((cualidad, index) => (
          <div key={index}>
            <h6 className="text-sm font-bold text-gray-900 mt-2 sm:text-base">
              {cualidad}
            </h6>
            {Object.values(producto.especificacion).map((row, i) => {
              return row.cualidad === cualidad ? (
                <p key={i} className="text-xs text-gray-700 sm:text-sm">
                  {row.referencia_esp}
                </p>
              ) : null;
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-900 sm:text-4xl">$899.00</span>
        <span className="text-sm font-medium text-gray-500 line-through sm:text-base">
          $999.00
        </span>
      </div>

    </div>
  );
}

export default Card;




