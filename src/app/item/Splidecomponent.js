"use client";
import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import Card from "@/components/Card";
import { BsSearch } from "react-icons/bs";
import { useProductos } from "@/context/Context";
export default function Splidecomponent({ productos }) {
  const [filter, setFilter] = useState(false);
  //console.log(productos);

  /**
   * para filtrar
   */
  return (
    <div>
      <button
        className="absolute  bottom-20 right-5 z-50 h-10 px-4 font-semibold rounded-md bg-black text-white " // Ajustes para visibilidad y posición
        type="button"
        onClick={() => setFilter(!filter)} // Cambia el estado al hacer clic
      >
        <BsSearch />
      </button>

      {filter ? <Buscador /> : ""}

      <main className="flex flex-col min-h-screen items-center justify-center bg-gray-100 md:flex-row">
        <Splide
          options={{
            type: "slide",
            perPage: 3,
            perMove: 1,
            gap: "0px",
            pagination: false,
            arrows: true,
            padding: "10px",
          }}
          className="w-full md:max-w-screen-xl"
        >
          {productos.slice(0, 10).map((row) => (
            <SplideSlide key={row.id_producto}>
              <Link href={`/item/${row.id_producto}`}>
                <Card producto={row} />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </main>
    </div>
  );
}