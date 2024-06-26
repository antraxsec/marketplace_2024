"use client";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { db } from '../app/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { doc, onSnapshot } from "firebase/firestore";


export const ProductosContext = createContext();
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [precioGanacia, setPrecioGanancia] = useState(90);
  const [tipoMoneda, setTipoMoneda] = useState(1);
  const [precioVisible, setPrecioVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [visibleDetalles, setVisibleDetalles] = useState(false);
  const [producto, setProducto] = useState({});
  const [verproducto, setVerproducto] = useState(false);
  const [configPrecio, setConfigPrecio] = useState({}); //configuracion de precio
  const [cpo, setCpo] = useState(false); //para mostrar la configuracion del precio
  const [mostrarslider, setMostrarslider] = useState(true);//mostrar el sidevar en SM para moviles 
  const [user, setUser] = useState(null)

  // Función para guardar en localStorage
  const guardarEnLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Función para recuperar de localStorage
  const recuperarDeLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  // const fetchProducto = async () => {
  //   setIsLoaded(false);
  //   try {
  //     const response = await fetch("https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G", { cache: "no-store" });
  //     const data = await response.json();
  //     let datosnew = Object.values(data.datos);
  //     setProductos(datosnew);
  //     setProductosFiltrados(datosnew)
  //     setIsLoaded(true);
  //     guardarEnLocalStorage('productos', datosnew)
  //     return datosnew
  //   } catch (error) {
  //     console.error("Error al cargar datos:", error);
  //   }
  //   setIsLoaded(true);
  // };

  //nuevo funcional
  const fetchProducto = async () => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G",
        { cache: "no-store" }
      );
      const data = await response.json();
      let datosNuevos = Object.values(data.datos);
      // console.log(datosNuevos)
      const datosAlmacenados = recuperarDeLocalStorage("productos");
      // Comparamos los datos nuevos con los almacenados
      if (JSON.stringify(datosNuevos) !== JSON.stringify(datosAlmacenados)) {
        console.log("Actualizando datos...");

        setProductos(datosNuevos);
        guardarEnLocalStorage("productos", datosNuevos);
        setProductosFiltrados(datosNuevos);
        setIsLoaded(true);
      } else {
        console.log("Los datos no han cambiado, no se requiere actualización.");
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  // Efecto para cargar productos y recuperar productos filtrados al iniciar
  useEffect(() => {
    const productosLocales = recuperarDeLocalStorage("productos");
    if (productosLocales) {
      setProductosFiltrados(productosLocales);
      setProductos(productosLocales);
      setIsLoaded(true);
    }
    fetchProducto(); // Siempre se llama, pero actualiza solo si hay cambios.
    // Asumiendo que tienes lógica similar para precioGanancia, tipoMoneda, etc.

    //precio recuperar - moneda
    setPrecioGanancia(recuperarDeLocalStorage("precio"));
    setTipoMoneda(recuperarDeLocalStorage("tipo"));
    setIsChecked(recuperarDeLocalStorage("verprecio"));
    setUser(recuperarDeLocalStorage("user"));

  }, []);


  // especial para precio 
  useEffect(() => {
    console.log('Subscribiéndose a cambios en los datos de precio...');
    // Recuperar datos de Firebase afiliados
    if (user) {
      console.log('usuario acrual', user)
      if (user.rol !== 'admin') {
        const documentoId = user.rol;
        const docRef = doc(db, "PrecioModificable", documentoId);
        // Iniciar la escucha de cambios en el documento
        const unsubscribe = onSnapshot(docRef, async (doc) => {
          if (doc.exists()) {
            console.log("Datos actuales: ", doc.data());
            console.log('usuario', user)
            setConfigPrecio(doc.data());
          } else {
            // Documento no existe
            console.log("El documento no existe!");
          }
        });
        // Limpiar la suscripción cuando el componente se desmonte
        return () => unsubscribe();
      } else {
        setConfigPrecio(recuperarDeLocalStorage("config-precio"));
      }
    } else {
      console.log('no hay')
    }

  }, [user]);
  // end especial para precio




  const filtrar = (data) => {
    guardarEnLocalStorage("productosFiltrados", data);
    setProductosFiltrados(data);
  };

  const verPrecio = (data) => {
    setPrecioVisible(data);
  };

  const preciosG = (data) => {
    setPrecioGanancia(data);
  };

  const mostrarPrecio = () => {
    localStorage.setItem("verprecio", JSON.stringify(!isChecked));
    setIsChecked(!isChecked);
  };

  const mostrarDetalles = () => {
    setVisibleDetalles(!visibleDetalles);
  };

  const actaulizarData = async () => {
    await fetchProducto();
    alert("actualizado data");
  };

  // Mandar datos
  const precioConfigurado = (factor_avg, costo_avg, precio_config) => {

    // console.log('precio config', Object.values(precio_config), Object.values(precio_config).length)
    if (!configPrecio) {
      return "Sin Configurar";
    }

    // Convertir a números
    factor_avg = Number(factor_avg);
    costo_avg = Number(costo_avg);
    if (configPrecio.tc) configPrecio.tc = Number(configPrecio.tc);
    if (configPrecio.margen) configPrecio.margen = Number(configPrecio.margen);

    if (Object.values(precio_config) && Object.values(precio_config).length > 0) {
      return `${precio_config[0].simbolo_moneda} ${Number(
        precio_config[0].valor_precio
      ).toFixed(2)}`;
    } else {
      if (configPrecio.tipoPrecio === "fijo") {
        if (configPrecio.moneda === "dolares") {
          let precioFin =
            configPrecio.tc * costo_avg + configPrecio.tc * configPrecio.margen;
          return `Bs ${precioFin.toFixed(2)}`;
        } else if (configPrecio.moneda === "bolivianos") {
          let precioFin = configPrecio.tc * costo_avg + configPrecio.margen;
          return `Bs ${precioFin.toFixed(2)}`;
        }
      } else if (configPrecio.tipoPrecio === "dinamico") {
        if (configPrecio.moneda === "dolares") {
          let precioFin =
            costo_avg * factor_avg + factor_avg * configPrecio.margen;
          return `Bs ${precioFin.toFixed(2)}`;
        } else if (configPrecio.moneda === "bolivianos") {
          let precioFin = costo_avg * factor_avg + configPrecio.margen;
          return `Bs ${precioFin.toFixed(2)}`;
        }
      } else {
        return "Sin precio";
      }
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        isLoaded,
        productosFiltrados,
        precioGanacia,
        filtrar,
        verPrecio,
        preciosG,
        precioVisible,
        mostrarPrecio,
        isChecked,
        visibleDetalles,
        mostrarDetalles,
        setPrecioGanancia,
        setTipoMoneda,
        tipoMoneda,
        actaulizarData,
        setProducto,
        producto,
        setVerproducto,
        verproducto,
        configPrecio,
        setConfigPrecio,
        precioConfigurado,
        setCpo,
        cpo,
        mostrarslider,
        setMostrarslider,
        setUser,
        user
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
