"use client";
import React, { useEffect, useState } from "react"
import "@splidejs/splide/dist/css/splide.min.css";

import Card from "@/components/Card";
import { useProductos } from "@/context/Context";
import Buscar2 from "../Buscar2";
import Loading from "@/components/Loading";
import { loadFontAwesome } from "../services/fontawesome";
import Navbar from "../Navbar";
import Modal from "@/components/Modal";

export default function Splidecomponent() {
  const { isLoaded, productosFiltrados, visibleDetalles, mostrarDetalles, setVerproducto, verproducto } = useProductos()
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


  useEffect(() => {
    // Añade una entrada al historial cuando el modal se abre
    if (verproducto) {
      window.history.pushState({ modalOpen: true }, '');
    }

    // Escucha el evento popstate para cerrar el modal
    const handlePopState = (event) => {
      if (event.state?.modalOpen) {
        setVerproducto(false); // Aquí cierras el modal
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Limpieza al desmontar el componente
    return () => window.removeEventListener('popstate', handlePopState);
  }, [verproducto, setVerproducto]);


  if (!isLoaded) {
    return (
      <Loading />
    );
  }


  window.onpopstate = function (event) {
    console.log('cerrar modal')
    setVerproducto(false)
    //history.replaceState({}, '');
  };
  return (
    <div
      className={`relative ${visibleDetalles ? "bg-gray-100 bg-opacity-50" : "bg-gray-100"
        }`}
    >
      {/* Overlay */}
      {visibleDetalles && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      {verproducto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {verproducto ? '' : <Navbar />}

      {loadFontAwesome()}
      {/* Sidebar aquí */}
      <div
        id="drawer-navigation"
        className={`fixed transform top-0 z-50 p-4 inset-y-0 left-0 overflow-y-auto transition-all ease-in-out duration-500 ${visibleDetalles ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-white`}
      >
        <Buscar2 />
        {/* Resto del contenido del sidebar */}
      </div>


      {verproducto ? (
        <div className="">
          <Modal />
        </div>
      ) : ''}


      {/* El resto de tu página aquí, asegúrate de agregar un z-index menor al overlay si es necesario */}


      <div
        className={`transition-opacity duration-500 ${visibleDetalles ? "opacity-50" : "opacity-100"
          }`}
      >

        <br />
        <br />
        <br />
        {Object.keys(productosPorMarca).map((marca, i) => (
          // SECCION

          <main
            key={i}
            className="p-4"
            onClick={() => {
              if (visibleDetalles == true) {
                mostrarDetalles();
              }
            }}
          >

            {/* <h6 className=" text-2xl font-bold text-gray-900 ">
              {marca}
            </h6> */}


            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
              {productosPorMarca[marca].slice(0, 30).map((producto, i) => (
                <Card key={i} producto={producto} />
              ))}
            </div>


          </main>
          // END SECCION
        ))}
      </div>
    </div>
  );
}