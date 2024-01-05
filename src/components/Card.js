import { FaShareAlt, FaRegHeart } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Card({ producto }) {
  // Asumiendo que las estrellas pueden ser una parte proporcional (e.g., 4.5 estrellas)
  const rating = 4.5;
  const totalReviews = 97;

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<BsStarFill className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<BsStarHalf className="text-yellow-400" />);
      } else {
        stars.push(<BsStar className="text-yellow-400" />);
      }
    }
    return stars;
  };
  return (
    <div className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center p-4 mx-3">
      <div className="self-start">
        {/* <div className="flex space-x-1 text-gray-500">
            <FaShareAlt />
            <FaRegHeart />
          </div> */}
      </div>
      <img
        className="w-full mt-1"
        src={
          Object.values(producto.imagenes).length === 0
            ? `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`
            : Object.values(producto.imagenes).find(
                (row) => row.cod_albumtipo == "5"
              )
            ? `https://multilaptops.net/${
                Object.values(producto.imagenes).find(
                  (row) => row.cod_albumtipo == "5"
                ).ruta_img
              }`
            : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`
        }
        alt="Laptop"
      />
      <h5 className="mt-4 text-lg font-bold tracking-tight text-gray-900">
        {producto.nombre_linea} - {producto.nombre_marca}
      </h5>
      {/* <div className="flex items-center mt-1">
        {renderStars()}
        <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {totalReviews}
        </span>
      </div> */}
      <div className="text-left w-full px-4 mt-3">
        <h6 className="text-xs font-bold text-gray-900">Procesador</h6>

        {Object.values(producto.especificacion).map((row, i) => {
          //console.log(row.cualidad);
          return row.cualidad === "Procesador" ? (
            <p key={i} className="text-xs text-gray-700">
              {row.referencia_esp}
            </p>
          ) : (
            ""
          );
        })}

        <h6 className="text-xs font-bold text-gray-900 mt-2">Memoria RAM</h6>

        {Object.values(producto.especificacion).map((row, i) => {
          //console.log(row.cualidad);
          return row.cualidad === "Memoria RAM" ? (
            <p key={i} className="text-xs text-gray-700">
              {row.referencia_esp}
            </p>
          ) : (
            ""
          );
        })}

        <h6 className="text-xs font-bold text-gray-900 mt-2">
          Unidad de estado solido (SSD)
        </h6>

        {Object.values(producto.especificacion).map((row, i) => {
          //console.log(row.cualidad);
          return row.cualidad === "Unidad de estado solido (SSD)" ? (
            <p key={i} className="text-xs text-gray-700">
              {row.referencia_esp}
            </p>
          ) : (
            ""
          );
        })}

        <h6 className="text-xs font-bold text-gray-900 mt-2">Pantalla</h6>

        {Object.values(producto.especificacion).map((row, i) => {
          //console.log(row.cualidad);
          return row.cualidad === "Pantalla" ? (
            <p key={i} className="text-xs text-gray-700 mb-4">
              {row.referencia_esp}
            </p>
          ) : (
            ""
          );
        })}
      </div>

      <div className="mt-3 flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-900">$899.00</span>
        <span className="text-sm font-medium text-gray-500 line-through">
          $999.00
        </span>
      </div>
      {/* <button
          type="button"
          className="mt-4 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300"
        >
          <AiOutlineShoppingCart className="mr-2 -ml-1 w-4 h-4" />
          Add to Cart
        </button> */}
    </div>
  );
}

export default Card;
