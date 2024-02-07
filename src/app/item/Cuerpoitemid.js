"use client"
import React, { useState } from 'react'
import { loadFontAwesome } from "@/app/services/fontawesome";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useQRCode } from "next-qrcode";
import { AiOutlineHeart } from "react-icons/ai";
import { useProductos } from "@/context/Context";
import Modal from 'react-modal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/navigation";
import Carousel from './Carousel';


export default function Cuerpoitemid({ producto }) {
    const { precioGanacia, isChecked } = useProductos();
    const router = useRouter();
    const [mainImage, setMainImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Canvas } = useQRCode();
    const obtenerImagenUrl = () => {

        const imagen = Object.values(producto.imagenes).find(
            (row) => row.cod_albumtipo === "5"
        );
        console.log('URL', imagen)
        return imagen
            ? mainImage || `https://multilaptops.net/${imagen.ruta_img}`
            : mainImage || `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
    };
    const handleBack = () => {
        router.back();
    };
    const handleShareWhatsApp = () => {
        const text = `Mira este producto en Multilaptops: ${window.location.href}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
    };
    const handleShareFacebook = () => {
        console.log(window.location.href);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const selectImage = (image) => {
        setMainImage(image);

    };
    return (
      <>
        {loadFontAwesome()}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-10 lg:px-20">
          <div className="flex flex-col justify-center p-6  h-full ">
            {/* Imagen principal grande */}
            <div className="mb-4 w-full h-[300px] ">
              <img
                src={obtenerImagenUrl()}
                alt="Imagen principal"
                className="w-full h-full object-contain sombra-png"
                onClick={() => {
                  setIsModalOpen(true);
                  if (mainImage == "") {
                    selectImage(
                      `https://multilaptops.net/${producto.imagenes[0]?.ruta_img}`
                    );
                  }
                }}
              />
            </div>
            {/* Miniaturas */}
            <div className="">
              <Carousel producto={producto} selectImage={selectImage} />
            </div>
          </div>
          <div className="flex flex-col justify-center p-6  h-full">
            <div className="flex items-center space-x-4">
              {/* Componente Canvas */}
              <Canvas
                text={"http://localhost:3000/item/100446"}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 4,
                  width: 80,
                  color: {
                    dark: "#000",
                    light: "#FFFF",
                  },
                }}
              />

              {/* Contenedor para los textos */}
              <div className="flex flex-col">
                <div className="multilaptops-text">
                  <span className="color-one text-1xl font-bold">multi</span>
                  <span className="color-two text-1xl font-bold">laptops</span>
                </div>
                <small className=" text-lg font-bold tracking-tight text-gray-900">
                  {producto.nombre_linea}{" "}
                </small>
                <p className="text-sm font-bold tracking-tight text-gray-400">
                  <small className=" top-5 left-4 text-sm font-bold bg-gray-900 p-1 text-white rounded">
                    {producto.nombre_marca}
                  </small>{" "}
                  SKU: {producto.id_producto}
                </p>
              </div>
            </div>

            <div className=" p-2  ">
              {[
                "Procesador",
                "Serie de procesador",
                "Memoria RAM",
                "Unidad de estado solido (SSD)",
                "Pantalla",
                "Gráficos",
              ].map((cualidad, index) => (
                <div key={index} className="flex items-center py-1">
                  <div className="text-xl text-gray-900 pr-3">
                    {Object.values(producto.especificacion).map((row, i) => {
                      return row.cualidad === cualidad ? (
                        <i
                          key={i}
                          className={`fa ${row.icono_tipocualidad}`}
                        ></i>
                      ) : null;
                    })}
                  </div>

                  <div>
                    <h5 className="font-semibold  text-gray-900">{cualidad}</h5>

                    {Object.values(producto.especificacion).map((row, i) => {
                      return row.cualidad === cualidad ? (
                        <p
                          key={i}
                          className="text-xxs sm:text-xs text-gray-700"
                        >
                          {row.referencia_esp}
                        </p>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 mb-6 text-sm font-medium">
              <button
                className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                type="button"
                onClick={handleBack}
              >
                <i className="fa fa-light fa-reply-all"></i>
              </button>

              <button
                className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
                onClick={() => router.push("/")}
              >
                <i className="fa fa-light fa fa-search"></i>
              </button>
              {/* Compartir en redes sociales */}
              <button
                className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
                onClick={handleShareWhatsApp}
              >
                <i className="fa fa-sharp fa-regular fa-share-nodes"></i>
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
              {isChecked ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">
                    {" "}
                    Bs{" "}
                    {(
                      (Number(producto.costo_avg) + precioGanacia) *
                      Number(producto.factor_avg)
                    ).toFixed(2)}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Modal para la imagen ampliada */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Imagen Ampliada"
          className="fixed inset-0 z-50 overflow-auto bg-white flex"
        >
          <div className="relative p-4 w-full max-w-6xl m-auto flex justify-center">
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={mainImage}
                  alt="Imagen ampliada"
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      </>
    );
}
