import api from "../api";

export default async function page() {
    const productos = await api.productos();
    console.log(productos);
    return <div>page</div>;
}





//dunciona
// import api from "../../api";

// export async function getStaticPaths() {
//   const productos = await api.productos();
//   const paths = productos.map((producto) => ({
//     params: { id: producto.id_producto.toString() },
//   }));
//   return { paths, fallback: false };
// }

// export default async function page({ params: { id } }) {
//   const producto = await api.producto(id);
//   console.log("producto ", producto);
//   console.log(id);
//   return <div>page</div>;
// }
