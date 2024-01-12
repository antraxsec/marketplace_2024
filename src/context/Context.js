"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const ProductosContext = createContext();
console.log('Context')
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context)
    throw new Error("useProductos must be used within ProductosProvider");
  return context;
};



// Asumiendo que ya tienes ProductosContext creado
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [precioGanacia, setPrecioGanancia] = useState(90)

  // Función para guardar en localStorage
  const guardarEnLocalStorage = (productos) => {
    localStorage.setItem('productosFiltrados', JSON.stringify(productos));
  };

  const fetchProducto = async () => {

    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G"
      );
      const data = await response.json();
      let datosnew = Object.values(data.datos);

      console.log('Context Productos', datosnew)
      setProductos(datosnew);
      //setProductosFiltrados(datosnew)
      setIsLoaded(true); // Se establece a true después de cargar los datos
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setIsLoaded(true); // También se establece a true en caso de error
    }
  };

  useEffect(() => {
    fetchProducto();

    // Recuperar productos filtrados de localStorage al iniciar
    const productosGuardados = localStorage.getItem('productosFiltrados');
    if (productosGuardados) {
      setProductosFiltrados(JSON.parse(productosGuardados));
    }
  }, []);

  // Efecto para guardar productos filtrados en localStorage cuando cambian
  useEffect(() => {
    if (productosFiltrados.length > 0) {
      guardarEnLocalStorage(productosFiltrados);
    }
  }, [productosFiltrados]);

  const filtrar = (data) => {
    console.log('Productos Context FILTRADO', data);
    setProductosFiltrados(data);
  };

  return (
    <ProductosContext.Provider value={{ productos, isLoaded, productosFiltrados, precioGanacia, filtrar }}>
      {children}
    </ProductosContext.Provider>
  );
};

