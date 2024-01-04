import { FaShareAlt, FaRegHeart } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Card() {
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
    <div className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center p-4">
      <div className="self-start">
        {/* <div className="flex space-x-1 text-gray-500">
            <FaShareAlt />
            <FaRegHeart />
          </div> */}
      </div>
      <img
        className="w-full mt-4"
        src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301363/0276154398.webp"
        alt="Laptop"
      />
      <h5 className="mt-4 text-lg font-bold tracking-tight text-gray-900">
        Apple iPhone 15 Pro
      </h5>
      <div className="flex items-center mt-1">
        {renderStars()}
        <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {totalReviews}
        </span>
      </div>
      <div className="text-left w-full px-4 mt-3">
        <h6 className="text-xs font-bold text-gray-900">Procesador</h6>
        <p className="text-xs text-gray-700">
          Intel Core i5-1235U 4,40 Ghz Deca-core
        </p>
        <h6 className="text-xs font-bold text-gray-900 mt-2">Memoria RAM</h6>
        <p className="text-xs text-gray-700">8GB a 4267 Mhz</p>
        <h6 className="text-xs font-bold text-gray-900 mt-2">
          Unidad de estado solido (SSD)
        </h6>
        <p className="text-xs text-gray-700">SSD NVME 512 GB</p>
        <h6 className="text-xs font-bold text-gray-900 mt-2">Pantalla</h6>
        <p className="text-xs text-gray-700 mb-4">15,6" LED FULLHD IPS</p>
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
