import React, { useEffect, useRef, useState } from "react";
import { useProductos } from "@/context/Context";
import { useRouter } from "next/navigation";
import Checket from "./administrador/Checket";
import Accordion from "./Accordion";
import Cuerpoacordion from "./Cuerpoacordion";


export default function Buscar2() {
  const router = useRouter();
  const { productos, isLoaded, filtrar } = useProductos()

  // Estados para cada uno de los grupos de filtros
  const [selectedProcessors, setSelectedProcessors] = useState([]);

  /**
   * Busqueda en tiempo real
   */
  const [vectores, setVectores] = useState({});
  useEffect(() => {
    console.log('los vencore', vectores)
    BuscarCriteria(vectores, productos)

    // handleSearch(selectedProcessors);
  }, [vectores]);

  const crearVector = (categoria, valor) => {
    setVectores(vectoresPrevios => {
      // Copia el estado anterior
      const nuevosVectores = { ...vectoresPrevios };

      // Si la categoría aún no existe, inicializa un arreglo vacío
      if (!nuevosVectores[categoria]) {
        nuevosVectores[categoria] = [];
      }

      // Agrega el valor al arreglo de la categoría
      nuevosVectores[categoria].push(valor);

      console.log('los filtros', nuevosVectores)



      return nuevosVectores;
    });
  };

  // La función para eliminar elementos, igual que antes
  function eliminarTodosLosValores(objeto, clave, valorAEliminar) {
    // Verificar si el objeto tiene la clave y si es un arreglo
    if (objeto.hasOwnProperty(clave) && Array.isArray(objeto[clave])) {
      // Filtrar el arreglo para excluir el valor a eliminar
      objeto[clave] = objeto[clave].filter(valor => valor !== valorAEliminar);
    }
  }
  // Función para manejar los cambios en los checkbox de cada filtro
  const handleCheckboxChange = (setState, filterGroup, value, clave) => {
    console.log('{1f}', setState)
    console.log('{2f}', filterGroup)
    console.log('{3f}', value)
    console.log('{4f}', clave)

    // Determinar si el valor ya está seleccionado
    const currentIndex = filterGroup.indexOf(value);
    console.log('ver si esta selecionado', currentIndex)
    // esta parte ver si eliminar o no
    if (currentIndex == -1) {
      console.log('crear')
      crearVector(clave, value)
    } else {
      // Crear una copia del objeto para modificar
      const datosActualizados = { ...vectores };
      // Eliminar el elemento
      eliminarTodosLosValores(datosActualizados, clave, value);
      // Actualizar el estado con el nuevo objeto
      setVectores(datosActualizados);
      console.log('eliminar')
    }

    let newChecked = [...filterGroup];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // Actualizar el estado correspondiente
    console.log('ttttttttttttttt', newChecked)
    setState(newChecked);
  };

  // Función para manejar el envío del formulario
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   //console.log('{}{}{}{}{}{}{}{}{}', selectedBrands)
  //   //selectedProcessors.push(...selectedBrands)
  //   /**
  //    * gaardar en localStorage
  //    */
  //   //localStorage.setItem('criteria', JSON.stringify(searchCriteria));
  //   // Aquí enviarías los criterios de búsqueda a tu lógica de filtrado
  //   // handleSearch(selectedProcessors);
  //   //console.log('entro', searchCriteria);
  //   router.push('/item');
  // };

  /**
   *Buscar
   */
  function BuscarCriteria(criteria, productos) {
    let resultados = productos;

    for (const propiedad in criteria) {
      const valores = criteria[propiedad];

      resultados = resultados.filter(producto => {
        // Si el criterio es "nombre_marca", verifica directamente esta propiedad
        if (propiedad === "nombre_marca") {
          return valores.includes(producto.nombre_marca);
        }

        // Para otras propiedades, verifica dentro de "especificacion"
        if (producto.especificacion) {
          for (const key in producto.especificacion) {
            const especificacion = producto.especificacion[key];
            if (especificacion.cualidad === propiedad) {
              return valores.some(valor => especificacion.referencia_esp.includes(valor));
            }
          }
        }
        return false;
      });
    }

    // Elimina duplicados
    const productosUnicos = Array.from(new Set(resultados.map(p => p.id_producto)))
      .map(id => {
        return resultados.find(p => p.id_producto === id);
      });
    filtrar(productosUnicos);
    return productosUnicos;
  }


  //v1 buscar citerio
  // function handleSearch(criterios) {
  //   if (!Array.isArray(criterios)) {
  //     console.error('criterios debe ser un array');
  //     return [];
  //   }

  //   const filtrado = productos.filter(producto => {
  //     return criterios.some(criterio => {
  //       return Object.values(producto.especificacion).some(especificacion => {
  //         return especificacion.referencia_esp.includes(criterio);
  //       });
  //     });
  //   });

  //   filtrar(filtrado);
  //   return filtrado;
  // }

  //v2 buscar criterio  menjor
  // function handleSearch(criterios) {
  //   if (!Array.isArray(criterios)) {
  //     console.error('criterios debe ser un array');
  //     return [];
  //   }

  //   const filtrado = productos.filter(producto => {
  //     // Chequea si alguno de los criterios coincide con la marca del producto
  //     const coincideMarca = criterios.some(criterio =>
  //       producto.nombre_marca.toLowerCase().includes(criterio.toLowerCase())
  //     );

  //     // Chequea si alguno de los criterios coincide con alguna especificación
  //     const coincideEspecificacion = criterios.some(criterio =>
  //       Object.values(producto.especificacion).some(especificacion =>
  //         especificacion.referencia_esp.toLowerCase().includes(criterio.toLowerCase())
  //       )
  //     );

  //     return coincideMarca || coincideEspecificacion;
  //   });

  //   filtrar(filtrado);
  //   return filtrado;
  // }
  //v3 buscar criterio
  // function handleSearch(criterios) {
  //   if (!Array.isArray(criterios)) {
  //     console.error('criterios debe ser un array');
  //     return [];
  //   }

  //   const filtrado = productos.filter(producto => {
  //     // Verifica si el producto cumple con todos los criterios
  //     return criterios.every(criterio => {
  //       // Chequea si el criterio coincide con la marca del producto
  //       if (producto.nombre_marca.toLowerCase().includes(criterio.toLowerCase())) {
  //         return true;
  //       }

  //       // Chequea si el criterio coincide con alguna especificación
  //       return Object.values(producto.especificacion).some(especificacion =>
  //         especificacion.referencia_esp.toLowerCase().includes(criterio.toLowerCase())
  //       );
  //     });
  //   });

  //   filtrar(filtrado);
  //   return filtrado;
  // }
  //v4 buscar criterio
  // function handleSearch(criterios) {
  //   if (!Array.isArray(criterios)) {
  //     console.error('criterios debe ser un array');
  //     return [];
  //   }

  //   const filtrado = productos.filter(producto => {
  //     const marcaCriterios = criterios.filter(c => c.toLowerCase() === producto.nombre_marca.toLowerCase());
  //     const especificacionesCriterios = criterios.filter(c => c.toLowerCase() !== producto.nombre_marca.toLowerCase());

  //     const coincideMarca = marcaCriterios.length > 0 ? marcaCriterios.some(marca => producto.nombre_marca.toLowerCase().includes(marca.toLowerCase())) : true;
  //     const cumpleEspecificaciones = especificacionesCriterios.every(especificacion =>
  //       Object.values(producto.especificacion).some(esp =>
  //         esp.referencia_esp.toLowerCase().includes(especificacion.toLowerCase())
  //       )
  //     );

  //     return coincideMarca && cumpleEspecificaciones;
  //   });

  //   filtrar(filtrado);
  //   return filtrado;
  // }
  //v5 buscar criterio 
  // function handleSearch(criterios) {
  //   let productosFiltrados = productos.filter(producto => {
  //     let descripcion = producto.descripcion_producto.toLowerCase();
  //     let marca = producto.nombre_marca.toLowerCase();

  //     let cumpleCriterios = criterios.every(criterio => {
  //       criterio = criterio.toLowerCase();

  //       // Comprobar si el criterio es la marca
  //       if (marca === criterio) return true;

  //       // Comprobar si el criterio está en la descripción del producto
  //       if (descripcion.includes(criterio)) return true;

  //       // Comprobar si el criterio está en alguna especificación
  //       return Object.values(producto.especificacion).some(esp => {
  //         return esp.referencia_esp.toLowerCase().includes(criterio);
  //       });
  //     });

  //     return cumpleCriterios;
  //   });

  //   filtrar(productosFiltrados);
  //   return productosFiltrados;

  // }
  //v5 buscar criteri mejor revisar
  // function handleSearch(criterios) {
  //   // Separar las marcas de los otros criterios
  //   const marcas = criterios.filter(criterio => criterio.match(/hp|lenovo|azus/i));
  //   const otrosCriterios = criterios.filter(criterio => !criterio.match(/hp|lenovo|azus/i));

  //   let nuevo = productos.filter(producto => {
  //     // Verificar si el producto coincide con alguna de las marcas especificadas
  //     const cumpleMarca = marcas.length === 0 || marcas.some(marca => producto.nombre_marca.toLowerCase() === marca.toLowerCase());

  //     // Convertir el resto de la información relevante del producto a texto para la búsqueda
  //     let textoBusqueda = [producto.descripcion_producto, ...Object.values(producto.especificacion).map(esp => esp.referencia_esp)].join(' ').toLowerCase();

  //     // Verificar si el producto cumple con los otros criterios
  //     const cumpleOtrosCriterios = otrosCriterios.every(criterio => textoBusqueda.includes(criterio.toLowerCase()));

  //     return cumpleMarca && cumpleOtrosCriterios;
  //   });
  //   filtrar(nuevo);
  //   return nuevo;
  // }

  const [marcas, setMarcas] = useState([]);
  const [especificaciones, setEspecificaciones] = useState({});
  // Extraer opciones de filtro de los productos
  useEffect(() => {
    // Extraer marcas
    const marcasUnicas = [...new Set(productos.map(p => p.nombre_marca))];
    console.log('Marcas[FILTROS]', marcasUnicas)
    setMarcas(marcasUnicas);

    // Extraer especificaciones
    let especTemp = {};
    productos.forEach(p => {
      Object.values(p.especificacion).forEach(esp => {
        if (!especTemp[esp.cualidad]) {
          especTemp[esp.cualidad] = new Set();
        }
        especTemp[esp.cualidad].add(esp.referencia_esp);
      });
    });

    // Convertir Sets a arrays
    Object.keys(especTemp).forEach(key => {
      especTemp[key] = Array.from(especTemp[key]);
    });
    console.log('ESPESIFICACIONES[FILTRSO]', especTemp)
    setEspecificaciones(especTemp);
  }, [productos]);

  // funcion para poner solo 3 palabras
  function getFourWords(paragraph) {
    const words = paragraph.split(" ");
    const firstFourWords = words.slice(0, 5);
    return firstFourWords.join(" ");
  }

  function transformarDatosFiltro(datos) {
    return Object.entries(datos).map(([clave, valor]) => {
      return { clave, valor };
    });
  }


  return (
    <>
      <div className="max-w-2xl mx-auto my-8">
        <div className="flex justify-center mt-6">
          <p className="text-2xl font-bold text-gray-900 sm:text-3xl mb-3 ">
            Multilaptops
          </p>
        </div>
        <div className="flex justify-center mt-2">
          <Checket />
        </div>
        {/* acordion */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          <div className="max-w-2xl mx-auto my-10">
            <Accordion title={"Marcas"} className="border">
              <div className="p-3">
                {marcas.map((procesador) => (
                  <small key={procesador} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      checked={selectedProcessors.includes(procesador)}
                      onChange={() =>
                        handleCheckboxChange(
                          setSelectedProcessors,
                          selectedProcessors,
                          procesador,
                          "nombre_marca"
                        )
                      }
                    />
                    <span className="ml-2 ">{getFourWords(procesador)}</span>
                  </small>
                ))}
              </div>
            </Accordion>
            {transformarDatosFiltro(especificaciones).map((row, i) => (
              <Accordion key={i} title={row.clave} className="border">
                <Cuerpoacordion
                  handleCheckboxChange={handleCheckboxChange}
                  setSelectedProcessors={setSelectedProcessors}
                  selectedProcessors={selectedProcessors}
                  getFourWords={getFourWords}
                  valor={row.valor}
                  clave={row.clave}
                />

                {/* <div className="p-5">
                <Checket2 isChecked={procesadorCheket} mostrarProCheket={mostrarProCheket} />
                {
                  procesadorCheket ?
                    procesador.map((procesador, indice) => (
                      <small key={procesador} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5"
                          checked={selectedProcessors.includes(procesador)}
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedProcessors,
                              selectedProcessors,
                              procesador
                            )
                          }
                        />
                        <span className="ml-2 ">

                          {getFourWords(procesador)}
                        </span>
                      </small>
                    )
                    )
                    :

                    row.valor.map((procesador, indice) => (
                      <small key={procesador} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5"
                          checked={selectedProcessors.includes(procesador)}
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedProcessors,
                              selectedProcessors,
                              procesador
                            )
                          }
                        />
                        <span className="ml-2 ">

                          {getFourWords(procesador)}
                        </span>
                      </small>
                    )
                    )
                }
              </div> */}
              </Accordion>
            ))}

            {/* Repite el componente Accordion según sea necesario */}
          </div>
        </div>
        {/* end acrodion */}

        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-opacity-75"
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>
      {/* <!-- drawer component --> */}

      <div
        class="fixed  h-screen p-4    bg-white w-full dark:bg-gray-800"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  E-commerce
                </span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-example" class="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}



