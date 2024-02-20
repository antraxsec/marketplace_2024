const api = {
  productos: async () => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G"
      );
      const data = await response.json();
      let datosnew = Object.values(data.datos);
      //  console.log('uno', datosnew)
      return datosnew;
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  },
  producto: async (id) => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G"
      );
      const data = await response.json();

      let datosnew = Object.values(data.datos);
      // Ahora filtramos el resultado antes de retornar
      const resultado = datosnew.find(
        (producto) => producto.id_producto === id
      );
      //console.log('Unico', resultado)
      return resultado; // Asegúrate de retornar el resultado después de encontrarlo
    } catch (error) {
      console.error("Error al cargar datos del producto:", error);
    }
  },
};
export default api;
