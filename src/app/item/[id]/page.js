"use client";
import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMemory, FaHdd, FaLaptop, FaExpand } from "react-icons/fa";
import { MdScreenRotation } from "react-icons/md";
import { BiChip } from "react-icons/bi";
export default function Page() {
  const [favorite, setFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("m");

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const specs = [
    {
      icon: <BiChip />,
      title: "Procesador",
      description: "Intel® Core™ i9-12900H ",
    },
    {
      icon: <FaMemory />,
      title: "Memoria RAM",
      description: "16GB a 4800 Mhz de velocidad, ",
    },
    {
      icon: <FaHdd />,
      title: "Unidad de estado sólido (SSD)",
      description: "PCIe® NVMe™ M.2 de 1TB",
    },
    {
      icon: <MdScreenRotation />,
      title: "Pantalla",
      description: '16,1" LED 2.5K IPS (2560 x 1440), ',
    },
    // ... Agrega más especificaciones si es necesario
  ];

  useEffect(() => {
    const fetchProducto = () => {
      return fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G",
        {
          next: {
            revalidate: 60,
          },
        }
      ).then((res) => res.json());
    };
    fetchProducto();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 font-sans p-4 gap-4">
      <div className="relative">
        <img
          src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301363/0276154398.webp"
          alt="Zip Tote Basket"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="grid grid-cols-3 gap-2 p-2">
          {/* Aquí se mapearían las imágenes en miniatura basadas en los datos de tu producto */}
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              className="w-21 h-full object-cover"
              src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301363/0276154398.webp"
              alt={`thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="p-6">
        <h5 className="mt-4 text-lg font-bold tracking-tight text-gray-900">
          Apple iPhone 15 Pro
        </h5>

        <div className="bg-white p-4 ">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center py-2">
              <div className="text-xl text-gray-900 pr-4">{spec.icon}</div>
              <div>
                <h5 className="font-semibold  text-gray-900">{spec.title}</h5>
                <p className="text-gray-600">{spec.description}</p>
              </div>
            </div>
          ))}
          {/* <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 mt-4">
            Ver más...
          </button> */}
        </div>

        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200 space-x-2">
          {/* Botones de tamaño */}
          {["xs", "s", "m", "l", "xl"].map((size) => (
            <label key={size} className="cursor-pointer">
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value={size}
                checked={selectedSize === size}
                onChange={() => handleSizeSelect(size)}
              />
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                {size.toUpperCase()}
              </div>
            </label>
          ))}
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <button
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            type="button"
          >
            Promocion
          </button>
          <button
            className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
            type="button"
          >
            Comprar
          </button>
          <button
            className="flex-none w-9 h-9 rounded-md border border-slate-200 text-slate-300"
            type="button"
            aria-label="Like"
            onClick={toggleFavorite}
          >
            {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        <div className="mt-3 flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">$899.00</span>
          <span className="text-sm font-medium text-gray-500 line-through">
            $999.00
          </span>
        </div>
      </div>
    </div>
  );
}
