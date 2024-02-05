"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import Card from "@/components/Card";
import { useProductos } from "@/context/Context";
import Buscar2 from "../Buscar2";
import Loading from "@/components/Loading";
import { loadFontAwesome } from "../services/fontawesome";
import Buscador from "@/components/Buscador";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar";

export default function Splidecomponent() {
  const router = useRouter();
  const { productos, isLoaded, productosFiltrados } = useProductos()
  const [menuVisible, setMenuVisible] = useState(false);
  const [productosPorMarca, setProductosPorMarca] = useState({});
  const [searchVisible, setSearchVisible] = useState(false);


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

  const verBuscador = () => {

    console.log('Nro. filtrado', productosFiltrados.length)
    if (productosFiltrados.length == 1) {
      //mandar a una ruta
      //console.log(productosFiltrados[0].id_producto)
      router.push(`/item/${productosFiltrados[0].id_producto}`);
    }

    setSearchVisible(false)


  }


  if (!isLoaded) {
    // console.log(" prodictos = nuevo ver dos", producto);
    return (
      <Loading />
    );
  }


  return (
    <div className="" >

      <Navbar setMenuVisible={setMenuVisible} />


      {loadFontAwesome()}
      {/* <div className="fixed  top-1 left-1/2 transform -translate-x-1/2 z-50 ">
        <div className="grid grid-cols-2 gap-0">
          <div className=" flex justify-end items-end ">
            <button
              className={` text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-s-lg  text-sm px-5 py-2.5 text-center  
            }`}
              type="button"

              onClick={() => setMenuVisible(!menuVisible)}
            >

              <i className="fa fa-light fa fa-cog"></i> Filtrar
            </button>
          </div>
          <div className=""><Buscador verBuscador={verBuscador} /></div>
        </div>


       
      </div> */}



      {/* Menú de filtros */}
      <div
        className={`transform transition-all ease-in-out duration-500 z-50 scrollbar menu-transparente ${menuVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-100"
          } w-64 bg-gray-100 p-4 fixed inset-y-0 left-0  overflow-y-auto`}
      >
        <Buscar2 />
        {/* ... Resto de tu contenido ... */}
      </div>

      {/* {Object.keys(productosPorMarca).map((marca) => (
        <>{marca}</>
      ))} */}

      {Object.keys(productosPorMarca).map((marca) => (
        // SECCION
        <main key={marca} className=" bg-gray-200"
          onClick={() => {
            if (menuVisible == true) {
              setMenuVisible(false);

            }
          }}
        >
          <h6 className="mx-6 text-2xl font-bold text-gray-900 py-5">
            {marca}
          </h6> {/* Título de la marca */}
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
                    perPage: 4
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
  );
}