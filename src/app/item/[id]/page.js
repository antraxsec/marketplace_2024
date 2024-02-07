import api from "../../api";
import Cuerpoitemid from "../Cuerpoitemid";

export async function getStaticPaths() {
  // Suponiendo que `fetchProductos` es una función que obtiene los productos desde un API o base de datos
  const productos = await api.productos(); // Debes crear esta función según tu backend
  const paths = productos.map((producto) => ({
    params: { id: producto.id_producto.toString() }, // Asegúrate de que los IDs son strings
  }));
  return { paths, fallback: false }; // O `true` o `'blocking'` si quieres usar ISR o SSR para rutas no generadas
}

export default async function page({ params: { id } }) {
  const producto = await api.producto(id);
  console.log("producto ", producto);
  console.log(id);
  return <div className="flex justify-center items-center w-full h-screen">
    <Cuerpoitemid producto={producto} />
  </div>;
}

