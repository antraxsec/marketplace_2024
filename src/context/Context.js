"use client";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

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
  const [precioVisible, setPrecioVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [visibleDetalles, setVisibleDetalles] = useState(true)

  // Función para guardar en localStorage
  const guardarEnLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Función para recuperar de localStorage
  const recuperarDeLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const fetchProducto = async () => {
    setIsLoaded(false);
    try {
      const response = await fetch("https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G");
      const data = await response.json();
      let datosnew = Object.values(data.datos);
      setProductos(datosnew);

    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
    setIsLoaded(true);
  };







  // Efecto para cargar productos y recuperar productos filtrados al iniciar
  useEffect(() => {
    fetchProducto();

    //setProductosFiltrados(recuperarDeLocalStorage('productosFiltrados') || []);
  }, []);



  // Efecto para guardar productos filtrados en localStorage cuando cambian
  useEffect(() => {
    if (productosFiltrados.length === 0) {
      setProductosFiltrados(productos)
    }

    //guardarEnLocalStorage('productosFiltrados', productosFiltrados);
  }, [productosFiltrados]);

  const filtrar = (data) => {
    guardarEnLocalStorage('productosFiltrados', data);
    setProductosFiltrados(data);
  };

  const verPrecio = (data) => {
    setPrecioVisible(data);
  };

  const preciosG = (data) => {
    setPrecioGanancia(data);
  };

  const mostrarPrecio = () => {
    setIsChecked(!isChecked)
  }
  const mostrarDetalles = () => {
    setVisibleDetalles(!visibleDetalles)
  }

  // Mandar datos
  return (
    <ProductosContext.Provider value={{
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
      mostrarDetalles
    }}>
      {children}
    </ProductosContext.Provider>
  );
};
