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
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log('{}{}{}{}{}{}{}{}{}', selectedBrands)
    //selectedProcessors.push(...selectedBrands)
    /**
     * gaardar en localStorage
     */
    //localStorage.setItem('criteria', JSON.stringify(searchCriteria));
    // Aquí enviarías los criterios de búsqueda a tu lógica de filtrado
    // handleSearch(selectedProcessors);
    //console.log('entro', searchCriteria);
    router.push('/item');
  };

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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto my-8">
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
          <Accordion title={'Marcas'} className="border">
            <div className="p-3">
              {marcas.map(
                (procesador) => (
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
                          'nombre_marca'
                        )
                      }
                    />
                    <span className="ml-2 ">

                      {getFourWords(procesador)}
                    </span>
                  </small>
                )
              )}
            </div>
          </Accordion>
          {transformarDatosFiltro(especificaciones).map((row, i) => (


            <Accordion key={i} title={row.clave} className="border">


              <Cuerpoacordion handleCheckboxChange={handleCheckboxChange} setSelectedProcessors={setSelectedProcessors} selectedProcessors={selectedProcessors} getFourWords={getFourWords} valor={row.valor} clave={row.clave} />

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
    </form>
  );
}



