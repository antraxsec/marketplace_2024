"use client";
import { createContext, useContext, useState } from "react";

export const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context)
    throw new Error("useProductos must be used within ProductosProvider");
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const crearProductos = (data) => {
    // Para agregar nuevos productos sin eliminar los anteriores
    setProductos([1, 2, 3]);
  };

  return (
    <ProductosContext.Provider value={{ productos, crearProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};
