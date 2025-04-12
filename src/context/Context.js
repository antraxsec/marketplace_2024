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
  const [user, setUser] = useState(null);
  const [globalTC, setGlobalTC] = useState(13.5); // Estado para tipo de cambio global

  // Función para guardar en localStorage
  const guardarEnLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Función para recuperar de localStorage
  const recuperarDeLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const fetchProducto = async () => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G",
        { cache: "no-store" }
      );
      const data = await response.json();

      console.log('fetchProducto BBBB:', data)

      let datosNuevos = Object.values(data.datos);
      const configNuevo = data.config;

      // Recuperar datos almacenados
      const datosAlmacenados = recuperarDeLocalStorage("productos");
      const configAlmacenado = recuperarDeLocalStorage("config");

      // Comparamos los datos nuevos con los almacenados, incluyendo el config
      const productosHanCambiado = JSON.stringify(datosNuevos) !== JSON.stringify(datosAlmacenados);
      const configHaCambiado = JSON.stringify(configNuevo) !== JSON.stringify(configAlmacenado);

      if (productosHanCambiado || configHaCambiado) {
        console.log("Actualizando datos...", {
          productosHanCambiado,
          configHaCambiado
        });

        // Actualizar productos
        setProductos(datosNuevos);
        guardarEnLocalStorage("productos", datosNuevos);
        setProductosFiltrados(datosNuevos);

        // Actualizar config y tipo de cambio
        window.config = configNuevo;
        guardarEnLocalStorage("config", configNuevo);

        // Actualizar tipo de cambio global
        if (configNuevo && configNuevo[0] && configNuevo[0].tc) {
          const nuevoTC = Number(configNuevo[0].tc);
          setGlobalTC(nuevoTC);
          guardarEnLocalStorage("globalTC", nuevoTC);
        }

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

    // Recuperar tipo de cambio guardado
    const tcAlmacenado = recuperarDeLocalStorage("globalTC");
    if (tcAlmacenado) {
      setGlobalTC(tcAlmacenado);
    }

    fetchProducto(); // Siempre se llama, pero actualiza solo si hay cambios.

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
      console.log('usuario actual', user)
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

  const precioConfigurado = (factor_avg, costo_avg, precio_config) => {
    // Usar globalTC en lugar de window.config
    const tipoCambio = globalTC;

    if (!configPrecio) {
      return "Sin Configurar";
    }

    // Convertir a números
    factor_avg = Number(factor_avg);
    costo_avg = Number(costo_avg);
    if (configPrecio.tc) configPrecio.tc = Number(configPrecio.tc);
    if (configPrecio.margen) configPrecio.margen = Number(configPrecio.margen);

    if (Object.values(precio_config) && Object.values(precio_config).length > 0) {
      const precioConfig = precio_config[0];
      const precioOriginal = `${precioConfig.simbolo_moneda} ${Number(precioConfig.valor_precio).toFixed(2)}`;

      // Si el precio está en dólares, agregar conversión a Bs
      if (precioConfig.simbolo_moneda === 'US$') {
        const precioBolivianos = Number(precioConfig.valor_precio) * tipoCambio;
        return `${precioOriginal} \n(Bs ${precioBolivianos.toFixed(2)})`;
      }

      return precioOriginal;
    } else {
      if (configPrecio.tipoPrecio === "fijo") {
        if (configPrecio.moneda === "dolares") {
          let precioFin =
            configPrecio.tc * costo_avg + configPrecio.tc * configPrecio.margen;
          let precioOriginal = `US$ ${(configPrecio.tc * costo_avg).toFixed(2)}`;
          return `${precioOriginal} \n(Bs ${precioFin.toFixed(2)})`;
        } else if (configPrecio.moneda === "bolivianos") {
          let precioFin = configPrecio.tc * costo_avg + configPrecio.margen;
          return `Bs ${precioFin.toFixed(2)}`;
        }
      } else if (configPrecio.tipoPrecio === "dinamico") {
        if (configPrecio.moneda === "dolares") {
          let precioFin =
            costo_avg * factor_avg + factor_avg * configPrecio.margen;
          let precioOriginal = `US$ ${(costo_avg * factor_avg).toFixed(2)}`;
          return `${precioOriginal} \n(Bs ${precioFin.toFixed(2)})`;
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
        user,
        globalTC,
        setGlobalTC
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

//Subiendo el 12/04/2025 a las 09:49