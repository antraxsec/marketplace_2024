"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useHistory } from "next/router";

// Importa los iconos que necesitas
import { BsStarFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMemory, FaHdd, FaLaptop, FaExpand } from "react-icons/fa";
import { MdScreenRotation } from "react-icons/md";
import { BiChip } from "react-icons/bi";
import { loadFontAwesome } from "@/app/services/fontawesome";
import { useRouter } from "next/navigation";
import { useProductos } from "@/context/Context";
import { useQRCode } from "next-qrcode";

export default function Page({ params }) {
  const router = useRouter();
  const { Canvas } = useQRCode();
  const { productos, isLoaded, productosFiltrados, precioGanacia } =
    useProductos();

  const [producto, setProducto] = useState({});
  const [encontrado, setEncontrado] = useState(false);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchProducto = () => {
      console.log("entro dentro de buscador []", productos);
      let datosnew = productos;
      const resultado = datosnew.find(
        (producto) => producto.id_producto === params.id
      );
      console.log("resultado producto", resultado);

      setProducto(resultado);
      setEncontrado(true);
    };

    if (productos.length > 0) {
      console.log("productos id/:", productos);
      fetchProducto();
    }
  }, [productos, params.id]);

  /**
   * img
   */

  const [mainImage, setMainImage] = useState(""); // Estado para la imagen principal

  // Función para cambiar la imagen principal
  const selectImage = (image) => {
    setMainImage(image);
  };

  /**
   * Compartir por redes sociales
   */

  const handleShareWhatsApp = () => {
    const text = `Mira este producto en Multilaptops: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareFacebook = () => {
    console.log(window.location.href);
  };
  /**
   * para la imagen sea grande
   */
  const [isImageLarge, setIsImageLarge] = useState(false);

  if (!encontrado) {
    console.log(" prodictos = nuevo ver dos", producto);
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="absolute top-20 right-20 ">
        <Canvas
          text={window.location.href}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 130,
            color: {
              dark: "#000",
              light: "#FFFF",
            },
          }}
        />
      </div>
      {loadFontAwesome()}
      <div className="grid grid-cols-1 md:grid-cols-2 font-sans p-4 gap-4 max-w-4xl mx-auto">
        <div className="relative">
          {/* Imagen principal grande */}
          <div className="mb-4 w-full h-[300px]">
            <img
              src={
                mainImage ||
                `https://multilaptops.net/${producto.imagenes[0]?.ruta_img}`
              }
              alt="Imagen principal"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Miniaturas */}
          <Splide
            options={{
              type: "slide",
              perPage: 4,
              rewind: true,
              width: "100%",
              gap: "1rem",
            }}
          >
            {Object.values(producto.imagenes).map((row, index) => (
              <SplideSlide
                key={index}
                onClick={() =>
                  selectImage(`https://multilaptops.net/${row.ruta_img}`)
                }
              >
                <div className="w-full h-[80px]">
                  <img
                    src={`https://multilaptops.net/${row.ruta_img}`}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="p-6">
          <h5 className="mt-4 text-lg font-bold tracking-tight text-gray-900">
            {producto.nombre_linea}{" "}
            <small className=" top-5 left-4 text-xs font-bold bg-gray-900 p-1 text-white rounded">
              {producto.nombre_marca}
            </small>
          </h5>

          <p className="mt-4 text-md font-bold tracking-tight text-gray-400">
            CODIGO SKU: {producto.id_producto}
          </p>
          <div className=" p-4 ">
            {[
              "Procesador",
              "Memoria RAM",
              "Unidad de estado solido (SSD)",
              "Pantalla",
            ].map((cualidad, index) => (
              <div key={index} className="flex items-center py-2">
                <div className="text-xl text-gray-400 pr-3">
                  {Object.values(producto.especificacion).map((row, i) => {
                    return row.cualidad === cualidad ? (
                      <i key={i} className={`fa ${row.icono_tipocualidad}`}></i>
                    ) : null;
                  })}
                </div>

                <div>
                  <h5 className="font-semibold  text-gray-900">{cualidad}</h5>

                  {Object.values(producto.especificacion).map((row, i) => {
                    return row.cualidad === cualidad ? (
                      <p key={i} className="text-xxs sm:text-xs text-gray-700">
                        {row.referencia_esp}
                      </p>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
            {/* <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 mt-4">
            Ver más...
          </button> */}
          </div>

          <div className="flex space-x-4 mb-6 text-sm font-medium">
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              type="button"
              onClick={handleBack}
            >
              Regresar
            </button>

            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
              onClick={() => router.push("/")}
            >
              Buscar
            </button>
            {/* Compartir en redes sociales */}
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
              onClick={handleShareWhatsApp}
            >
              <i class="fa fa-sharp fa-regular fa-share-nodes"></i>
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
              onClick={handleShareFacebook}
            >
              <AiOutlineHeart />
            </button>
          </div>

          <div className="mt-3 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-900">
              {" "}
              Bs{" "}
              {(
                (Number(producto.costo_avg) + precioGanacia) *
                Number(producto.factor_avg)
              ).toFixed(2)}
            </span>
            <span className="text-sm font-medium text-gray-500 line-through">
              Bs{" "}
              {(
                (Number(producto.costo_avg) + precioGanacia) *
                Number(producto.factor_avg)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
