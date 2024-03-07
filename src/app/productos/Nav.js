'use client'
import { useProductos } from '@/context/Context';
import React, { useEffect, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import FlexSearch from 'flexsearch';
import Precioconfig from "./Precioconfig";

export default function Nav() {
  const { productos, filtrar, setCpo, cpo, mostrarslider, setMostrarslider, user } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (busqueda.length > 0) {
      const productosDatos = productos;

      // Crear un nuevo índice con FlexSearch
      const index = new FlexSearch.Index({
        tokenize: "forward",
      });

      productosDatos.forEach((producto) => {
        index.add(
          producto.id_producto,
          `${producto.id_producto} ${producto.nombre_marca} ${producto.nombre_linea} ${producto.nombre_modelo} ${producto.referencia_producto}`
        );
      });

      // console.log(productosDatos)

      // Realizar la búsqueda
      const resultadosIds = index.search(busqueda, {
        // Configura las opciones de búsqueda según necesites
      });

      // Filtrar los productosDatos basándonos en resultadosIds
      const coincidencias = resultadosIds.map((id) =>
        productosDatos.find((p) => p.id_producto === id)
      );

      if (coincidencias.length > 0) {
        console.log("si hay productos");
        filtrar(coincidencias);
      } else {
        filtrar([]);
        console.log("no hay productos");
      }
    }
  }, [busqueda]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b opacity-90 border-gray-100 dark:bg-dark-800 dark:border-dark-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">

            <button
              onClick={() => setMostrarslider(!mostrarslider)}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a
              href="#"
              className="flex ms-2 md:me-24 items-center "
            >
              <img
                src="https://multilaptops.net/recursos/imagenes/favicon/ml_favicon2.png"
                className="h-8 me-3 grayscale"
                alt="FlowBite Logo"
              />

              <h1 className=" hidden sm:block text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#4ade80] from-sky-200">
                  Store
                </span>{" "}
              </h1>

              {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">multilaptops</span> */}
            </a>
          </div>
          <div className="flex items-center flex-grow ">

            <div className="flex items-center ms-3 mt-1 flex-grow ">
              <div className='flex-grow '>
                <form className="max-w-lg mx-auto ">
                  <label className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Buscar
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      value={busqueda}
                      onChange={(e) =>
                        setBusqueda(e.target.value.toLowerCase())
                      }
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Buscar Marca, Ram..."
                    />
                  </div>
                </form>
              </div>


              <div onClick={() => setCpo(true)}>
                <h1 className="text-3xl w-10 h-10 rounded-full  flex items-center text-center p-1 mx-2  hover:bg-gray-100">
                  <CiSettings />
                </h1>
              </div>



              <div>


                <button
                  type="button"
                  className="flex p-1 mx-2 text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>


              </div>

              {/* <div
                className="z-50 absolute  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
