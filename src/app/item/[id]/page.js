// "use client";
// import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Modal from 'react-modal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Importa los iconos que necesitas
import { AiOutlineHeart } from "react-icons/ai";
import { loadFontAwesome } from "@/app/services/fontawesome";
import { useRouter } from "next/navigation";
import { useProductos } from "@/context/Context";
import { useQRCode } from "next-qrcode";
import Loading from "@/components/Loading";


export async function getStaticPaths() {
  // Suponiendo que `fetchProductos` es una función que obtiene los productos desde un API o base de datos
  const { productos } = useProductos(); // Debes crear esta función según tu backend
  const paths = productos.map(producto => ({
    params: { id: producto.id_producto.toString() }, // Asegúrate de que los IDs son strings
  }));

  return { paths, fallback: false }; // O `true` o `'blocking'` si quieres usar ISR o SSR para rutas no generadas
}

export default function Page({ params }) {
  return (<>
    hola
  </>)
}
// export default function Page({ params }) {
//   const router = useRouter();
//   const { Canvas } = useQRCode();





//   const { productos, precioGanacia, isChecked } = useProductos();


//   const [producto, setProducto] = useState({});
//   const [encontrado, setEncontrado] = useState(false);

//   const handleBack = () => {
//     router.back();
//   };

//   useEffect(() => {
//     const fetchProducto = () => {
//       console.log("entro dentro de buscador []", productos);
//       let datosnew = productos;
//       const resultado = datosnew.find(
//         (producto) => producto.id_producto === params.id
//       );
//       console.log("resultado producto", resultado);

//       setProducto(resultado);
//       setEncontrado(true);
//     };

//     if (productos.length > 0) {
//       console.log("productos id/:", productos);
//       fetchProducto();
//     }
//   }, [productos, params.id]);

//   /**
//    * img
//    */

//   const [mainImage, setMainImage] = useState(""); // Estado para la imagen principal

//   // Función para cambiar la imagen principal
//   const selectImage = (image) => {
//     setMainImage(image);

//   };

//   /**
//    * Compartir por redes sociales
//    */

//   const handleShareWhatsApp = () => {
//     const text = `Mira este producto en Multilaptops: ${window.location.href}`;
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   const handleShareFacebook = () => {
//     console.log(window.location.href);
//   };
//   /**
//    * para la imagen sea grande
//    */
//   // Estado para controlar la vista ampliada de la imagen
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Modifica la función para abrir el modal con la imagen seleccionada
//   // const selectImage = (image) => {
//   //   setMainImage(image);

//   // };

//   // Función para cerrar el modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const obtenerImagenUrl = () => {
//     const imagen = Object.values(producto.imagenes).find(
//       (row) => row.cod_albumtipo === "5"
//     );
//     return imagen
//       ? mainImage || `https://multilaptops.net/${imagen.ruta_img}`
//       : mainImage || `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
//   };


//   if (!encontrado) {
//     // console.log(" prodictos = nuevo ver dos", producto);
//     return (
//       <Loading />
//     );
//   }

//   return (
//     <div className="flex justify-center items-center w-full h-screen">
//       {loadFontAwesome()}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-10 lg:px-20">
//         <div className="flex flex-col justify-center p-6  h-full">
//           {/* Imagen principal grande */}
//           <div className="mb-4 w-full h-[300px]">
//             <img
//               src={
//                 obtenerImagenUrl()
//               }
//               alt="Imagen principal"
//               className="w-full h-full object-contain sombra-png"
//               onClick={() => {
//                 setIsModalOpen(true)
//                 if (mainImage == "") {
//                   selectImage(`https://multilaptops.net/${producto.imagenes[0]?.ruta_img}`)
//                 }

//               }}
//             />
//           </div>
//           {/* Miniaturas */}
//           {isModalOpen === false ? (
//             <Splide
//               options={{
//                 type: "slide",
//                 perPage: 4,
//                 pagination: false,
//                 arrows: true,
//                 width: "100%",
//                 gap: "1rem",
//               }}
//             >
//               {Object.values(producto.imagenes).map((row, index) => (
//                 <SplideSlide
//                   key={index}
//                   onClick={() =>
//                     selectImage(`https://multilaptops.net/${row.ruta_img}`)
//                   }
//                 >
//                   <div className="w-full h-[80px] border">
//                     <img
//                       src={`https://multilaptops.net/${row.ruta_img}`}
//                       alt={`Imagen ${index + 1}`}
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                 </SplideSlide>
//               ))}
//             </Splide>
//           ) : null}

//         </div>
//         <div className="flex flex-col justify-center p-6  h-full">


//           <div className="flex items-center space-x-4">
//             {/* Componente Canvas */}
//             <Canvas
//               text={window.location.href}
//               options={{
//                 errorCorrectionLevel: "M",
//                 margin: 3,
//                 scale: 4,
//                 width: 80,
//                 color: {
//                   dark: "#000",
//                   light: "#FFFF",
//                 },
//               }}
//             />

//             {/* Contenedor para los textos */}
//             <div className="flex flex-col">
//               <div className="multilaptops-text">
//                 <span className="color-one text-1xl font-bold">multi</span>
//                 <span className="color-two text-1xl font-bold">laptops</span>
//               </div>
//               <small className=" text-lg font-bold tracking-tight text-gray-900">
//                 {producto.nombre_linea}{" "}
//               </small>
//               <p className="text-sm font-bold tracking-tight text-gray-400">
//                 <small className=" top-5 left-4 text-sm font-bold bg-gray-900 p-1 text-white rounded">
//                   {producto.nombre_marca}
//                 </small>  SKU: {producto.id_producto}
//               </p>
//             </div>
//           </div>


//           <div className=" p-2  ">
//             {[
//               "Procesador",
//               "Serie de procesador",
//               "Memoria RAM",
//               "Unidad de estado solido (SSD)",
//               "Pantalla",
//               "Gráficos"
//             ].map((cualidad, index) => (
//               <div key={index} className="flex items-center py-1">
//                 <div className="text-xl text-gray-900 pr-3">
//                   {Object.values(producto.especificacion).map((row, i) => {
//                     return row.cualidad === cualidad ? (
//                       <i key={i} className={`fa ${row.icono_tipocualidad}`}></i>
//                     ) : null;
//                   })}
//                 </div>

//                 <div>
//                   <h5 className="font-semibold  text-gray-900">{cualidad}</h5>

//                   {Object.values(producto.especificacion).map((row, i) => {
//                     return row.cualidad === cualidad ? (
//                       <p key={i} className="text-xxs sm:text-xs text-gray-700">
//                         {row.referencia_esp}
//                       </p>
//                     ) : null;
//                   })}
//                 </div>
//               </div>
//             ))}

//           </div>
//           <span className="font-medium text-gray-500 text-xs mb-2">
//             {producto.nombre_marca} SKU:{producto.id_producto}


//             <div class="flex items-center">
//               <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>

//             </div>

//           </span>

//           <div className="flex space-x-4 mb-6 text-sm font-medium">
//             <button
//               className="h-10 px-6 font-semibold rounded-md bg-black text-white"
//               type="button"
//               onClick={handleBack}
//             >
//               <i class="fa fa-light fa-reply-all" ></i>
//             </button>

//             <button
//               className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
//               type="button"
//               onClick={() => router.push("/")}
//             >
//               <i className="fa fa-light fa fa-search"></i>
//             </button>
//             {/* Compartir en redes sociales */}
//             <button
//               className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
//               type="button"
//               onClick={handleShareWhatsApp}
//             >
//               <i className="fa fa-sharp fa-regular fa-share-nodes"></i>
//             </button>
//             <button
//               className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
//               type="button"
//               onClick={handleShareFacebook}
//             >
//               <AiOutlineHeart />
//             </button>
//           </div>

//           <div className="mt-3 flex flex-col items-center">
//             {isChecked ? (
//               <>
//                 <span className="text-3xl font-bold text-gray-900">
//                   {" "}
//                   Bs{" "}
//                   {(
//                     (Number(producto.costo_avg) + precioGanacia) *
//                     Number(producto.factor_avg)
//                   ).toFixed(2)}
//                 </span>
//                 {/* <span className="text-sm font-medium text-gray-500 line-through">
//                   Bs{" "}
//                   {(
//                     (Number(producto.costo_avg) + precioGanacia) *
//                     Number(producto.factor_avg)
//                   ).toFixed(2)}
//                 </span> */}
//               </>
//             ) : null}

//           </div>
//         </div>

//       </div>

//       {/* Modal para la imagen ampliada */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Imagen Ampliada"
//         className="fixed inset-0 z-50 overflow-auto bg-white flex"
//       >
//         <div className="relative p-4 w-full max-w-6xl m-auto flex justify-center">
//           <TransformWrapper>
//             <TransformComponent>
//               <img src={mainImage} alt="Imagen ampliada" className="max-h-[90vh] max-w-[90vw] object-contain" />
//             </TransformComponent>
//           </TransformWrapper>
//           <button
//             onClick={closeModal}
//             className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring"
//           >
//             Cerrar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

