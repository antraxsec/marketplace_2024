"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

// Importa los iconos que necesitas
import { BsStarFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMemory, FaHdd, FaLaptop, FaExpand } from "react-icons/fa";
import { MdScreenRotation } from "react-icons/md";
import { BiChip } from "react-icons/bi";

export default function Page({ params }) {
  const [favorite, setFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("m");
  const [producto, setProducto] = useState({});
  const [isLoaded, setIsLoaded] = useState(false); // Nuevo estado para controlar la carga

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const fetchProducto = async () => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G"
      );
      const data = await response.json();
      let datosnew = Object.values(data.datos);
      const resultado = datosnew.find(
        (producto) => producto.id_producto === params.id
      );
      setProducto(resultado);
      setIsLoaded(true); // Se establece a true después de cargar los datos
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setIsLoaded(true); // También se establece a true en caso de error
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [params.id]); // Agregar params.id como dependencia para recargar en caso de cambio

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 font-sans p-4 gap-4">
      <div className="relative">
        <Splide options={{ rewind: true, width: "100%", gap: "1rem" }}>
          {Object.values(producto.imagenes || {}).map((row, index) => (
            <SplideSlide key={index}>
              <img
                src={`https://multilaptops.net/${row.ruta_img}`}
                alt={`Imagen ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <div className="p-6">
        <h5 className="mt-4 text-lg font-bold tracking-tight text-gray-900">
          {producto.nombre_linea}
        </h5>

        <div className="bg-white p-4 ">
          {[
            "Procesador",
            "Memoria RAM",
            "Unidad de estado solido (SSD)",
            "Pantalla",
          ].map((cualidad, index) => (
            <div key={index} className="flex items-center py-2">
              <div className="text-xl text-gray-900 pr-4">O</div>
              <div>
                <h5 className="font-semibold  text-gray-900">{cualidad}</h5>

                {Object.values(producto.especificacion).map((row, i) => {
                  return row.cualidad === cualidad ? (
                    <p key={i} className="text-gray-600">
                      {row.referencia_esp}
                    </p>
                  ) : null;
                })}
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
      ;
    </div>
  );
}
