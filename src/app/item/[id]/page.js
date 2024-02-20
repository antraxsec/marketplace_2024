import api from "../../api";
import Cuerpoitemid from "../Cuerpoitemid";

export async function getStaticPaths() {
  const productos = await api.productos();
  const paths = productos.map((producto) => ({
    params: { id: producto.id_producto.toString() },
  }));
  return { paths, fallback: false };
}

export default async function page({ params: { id } }) {
  const producto = await api.producto(id);

  //console.log(producto)

  return (
    <div className=" ">
      <Cuerpoitemid producto={producto} />
    </div>
  );
}

