"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import Card from "@/components/Card";
import { useProductos } from "@/context/Context";
import Buscar2 from "../Buscar2";
import Loading from "@/components/Loading";
import { loadFontAwesome } from "../services/fontawesome";
import Navbar from "../Navbar";

export default function Splidecomponent() {
  const { isLoaded, productosFiltrados, visibleDetalles, mostrarDetalles } = useProductos()
  // console.log('productos', productosFiltrados)

  const [productosPorMarca, setProductosPorMarca] = useState({});


  useEffect(() => {
    const agruparPorMarca = productosFiltrados.reduce((acc, producto) => {
      const marca = producto.nombre_marca;
      if (!acc[marca]) {
        acc[marca] = [];
      }
      acc[marca].push(producto);
      return acc;
    }, {});

    setProductosPorMarca(agruparPorMarca);
  }, [productosFiltrados]);
  const toggleSidebar = () => {
    mostrarDetalles(); // Cambia el estado para mostrar/ocultar el sidebar
  };

  if (!isLoaded) {
    return (
      <Loading />
    );
  }
  return (
    <div className={`relative ${visibleDetalles ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-900'}`}>
      {/* Overlay */}
      {visibleDetalles && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <Navbar />
      {loadFontAwesome()}
      {/* Sidebar aquí */}
      <div id="drawer-navigation" className={`fixed transform top-0 z-50 p-4 inset-y-0 left-0 overflow-y-auto transition-all ease-in-out duration-500 ${visibleDetalles ? "translate-x-0" : "-translate-x-full"} w-64 bg-white`}>
        <Buscar2 />
        {/* Resto del contenido del sidebar */}
      </div>

      {/* El resto de tu página aquí, asegúrate de agregar un z-index menor al overlay si es necesario */}
      <div className={`transition-opacity duration-500 ${visibleDetalles ? 'opacity-50' : 'opacity-100'}`}>
        {Object.keys(productosPorMarca).map((marca) => (
          // SECCION
          <main key={marca} className=" bg-gray-200 px-2 py-3"
            onClick={() => {
              if (visibleDetalles == true) {
                mostrarDetalles();
              }
            }}
          >
            <h6 className="mx-6 text-2xl font-bold text-gray-900 py-5">
              {marca}
            </h6>
            <Splide options={{
              type: "slide",
              //autoplay: true,
              //autoplaySpeed: 2000,
              //pauseOnHover: true,
              perPage: 4,
              perMove: 1,
              type: "slide",
              // gap: '1rem',
              // arrows: true,
              pagination: false,
              gap: 10,
              padding: 5,
              breakpoints: {
                420: {
                  perPage: 1
                },
                640: {
                  perPage: 1
                },
                768: {
                  perPage: 2
                },
                991: {
                  perPage: 2
                },
                1024: {
                  perPage: 2
                },
                1200: {
                  perPage: 2
                },
                1440: {
                  perPage: 3
                },
                1600: {
                  perPage: 4
                },
                1920: {
                  perPage: 5
                }

              }
            }}>
              {productosPorMarca[marca].slice(0, 30).map((producto) => (
                <SplideSlide key={producto.id_producto}>
                  <Card producto={producto} />
                </SplideSlide>
              ))}
            </Splide>
          </main>
          // END SECCION
        ))}
      </div>
    </div>













  );
}