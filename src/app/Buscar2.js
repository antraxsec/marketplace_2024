import React, { useEffect, useRef, useState } from "react";
import { useProductos } from "@/context/Context";
import { useRouter } from "next/navigation";

import Accordion from "./Accordion";
import Cuerpoacordion from "./Cuerpoacordion";

export default function Buscar2() {
  const { productos, filtrar, mostrarDetalles } = useProductos()
  const [selectedProcessors, setSelectedProcessors] = useState([]);

  /**
   * Busqueda en tiempo real
   */
  const [vectores, setVectores] = useState({});
  useEffect(() => {
    BuscarCriteria(vectores, productos)
  }, [vectores]);

  const crearVector = (categoria, valor) => {
    setVectores(vectoresPrevios => {
      const nuevosVectores = { ...vectoresPrevios };
      if (!nuevosVectores[categoria]) {
        nuevosVectores[categoria] = [];
      }
      nuevosVectores[categoria].push(valor);
      //  console.log('FILTRO', nuevosVectores)
      return nuevosVectores;
    });
  };

  // La función para eliminar elementos, igual que antes
  function eliminarTodosLosValores(objeto, clave, valorAEliminar) {
    if (objeto.hasOwnProperty(clave) && Array.isArray(objeto[clave])) {
      objeto[clave] = objeto[clave].filter(valor => valor !== valorAEliminar);
    }
  }
  // Función para manejar los cambios en los checkbox de cada filtro
  const handleCheckboxChange = (setState, filterGroup, value, clave) => {
    const currentIndex = filterGroup.indexOf(value);
    if (currentIndex == -1) {
      crearVector(clave, value)
    } else {
      const datosActualizados = { ...vectores };
      eliminarTodosLosValores(datosActualizados, clave, value);
      // console.log('ELIMINADO', datosActualizados)
      setVectores(datosActualizados);
    }

    let newChecked = [...filterGroup];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setState(newChecked);
  };
  /**
   *Buscar
   */
  function BuscarCriteria(criteria, productos) {
    let resultados = productos;

    for (const propiedad in criteria) {
      const valores = criteria[propiedad];

      resultados = resultados.filter(producto => {
        if (propiedad === "nombre_marca") {
          return valores.includes(producto.nombre_marca);
        }
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

  const [marcas, setMarcas] = useState([]);
  const [especificaciones, setEspecificaciones] = useState({});
  useEffect(() => {
    // Extraer marcas
    const marcasUnicas = [...new Set(productos.map(p => p.nombre_marca))];
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
      <div className="max-w-2xl mx-auto my-8 bg-white">
        <button onClick={mostrarDetalles} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>

          <span className="sr-only">Close menu</span>
        </button>
        <div className="flex justify-center mt-6">
          <p className="text-2xl font-bold text-gray-900 sm:text-3xl mb-3 ">
            Multilaptops
          </p>
        </div>

        {/* acordion */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4  ">
          <div className="">
            <Accordion title={"Marcas"} className="">
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
              <Accordion key={i} title={row.clave} icono={row} className="">
                <Cuerpoacordion
                  handleCheckboxChange={handleCheckboxChange}
                  setSelectedProcessors={setSelectedProcessors}
                  selectedProcessors={selectedProcessors}
                  getFourWords={getFourWords}
                  valor={row.valor}
                  clave={row.clave}
                />
              </Accordion>
            ))}
            {/* Repite el componente Accordion según sea necesario */}
          </div>
        </div>
        {/* end acrodion */}
        {/* <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-opacity-75"
            >
              Filtrar
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
}



