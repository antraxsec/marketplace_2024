"use client";
import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import Card from "@/components/Card";
import { BsSearch } from "react-icons/bs";
import { useProductos } from "@/context/Context";
import { useRouter } from "next/navigation";
import Buscar2 from "../Buscar2";

export default function Splidecomponent() {
  const router = useRouter();
  const { productos, isLoaded, productosFiltrados } = useProductos();
  const [menuVisible, setMenuVisible] = useState(false);
  // const [filter, setFilter] = useState(false);

  return (
    <div>
      <button
        className="absolute z-50 h-10 px-4 font-semibold rounded-md border border-white text-white bg-black bg-opacity-25 hover:bg-opacity-50 top-10 left-1/2 transform -translate-x-1/2"
        type="button"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <BsSearch />
      </button>

      {/* Menú de filtros */}
      <div
        className={`transform transition-transform z-50  ${menuVisible ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-gray-900 bg-opacity-75 p-4 fixed inset-y-0 left-0 text-white overflow-y-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-gray-600 scrollbar-track-gray-100`}
      >
        {/* Contenido del menú */}
        <Buscar2 />
        {/* Lista de marcas */}
        {/* ... */}
      </div>

      <main
        className="flex flex-col min-h-screen items-center justify-center bg-gray-100 md:flex-row"
        onClick={() => {
          if (menuVisible == true) {
            setMenuVisible(false);
          }
        }}
      >
        <Splide
          options={{
            type: "slide",
            perPage: 4,
            perMove: 1,
            gap: "0px",
            pagination: false,
            arrows: true,
            padding: "10px",
            breakpoints: {
              640: { perPage: 1 }, // En pantallas menores a 640px muestra 1 item
              768: { perPage: 2 }, // En pantallas menores a 768px muestra 2 items
              1024: { perPage: 3 }, // En pantallas mayores a 1024px muestra 3 items
            },
          }}
          className="w-full md:max-w-screen-xl"
        >
          {productosFiltrados.slice(0, 30).map((row) => (
            <SplideSlide key={row.id_producto}>
              <Card producto={row} />
            </SplideSlide>
          ))}
        </Splide>
      </main>
    </div>
  );
}
