"use client";
import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import Card from "@/components/Card";

export default function Splidecomponent({ productos }) {
  console.log(productos);
  const [newProductos, setNewProductos] = useState([]);
  const [filter, setFilter] = useState(false);
  return (
    <div>
      <div className="absolute flex w-full  mb-6 text-sm font-medium  justify-center mt-2 ">
        <button
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          type="button"
          onClick={() => setFilter(true)}
        >
          Buscar
        </button>
        {/* <button
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
          type="button"
        >
          Favoritos
        </button> */}
      </div>
      {filter ? <Buscador /> : ""}

      <main className="flex min-h-screen items-center justify-center bg-gray-100 ">
        <Splide
          options={{
            type: "slide",
            perPage: 2,
            perMove: 1,
            gap: "10",
            pagination: false,
            arrows: true,
            padding: 100,
            breakpoints: {
              420: {
                perPage: 1,
              },
              640: {
                perPage: 2,
              },
            },
          }}
          className="max-w-screen-xl mx-auto"
        >
          {/* Aquí repetirías tu componente de producto dentro de SplideSlide tantas veces como sea necesario */}
          {productos.slice(0, 5).map((row) => (
            <SplideSlide key={row.id_producto}>
              <Link href={`/item/${row.id_producto}`}>
                <Card producto={row} />
              </Link>
            </SplideSlide>
          ))}
          {/* ... */}
        </Splide>
      </main>
    </div>
  );
}
