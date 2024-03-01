"use client"
import React, { useState } from 'react'
import { loadFontAwesome } from "@/app/services/fontawesome";
import { useQRCode } from "next-qrcode";
import { AiOutlineHeart } from "react-icons/ai";
import { useProductos } from "@/context/Context";
import Modal from 'react-modal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/navigation";
import Carousel from './Carousel';
import Loading from '@/components/Loading';


export default function Cuerpoitemid({ producto }) {

  console.log('Unico', producto)
  const { precioGanacia, tipoMoneda, isChecked, productos, isLoaded } = useProductos();
  const router = useRouter();
  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Canvas } = useQRCode();
  const obtenerImagenUrl = () => {

    const imagen = Object.values(producto.imagenes).find(
      (row) => row.cod_albumtipo === "5"
    );
    //console.log('URL', imagen)
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


  if (!isLoaded) {
    return (
      <Loading />
    );
  }
  return (
    <>
      <p className='p-4' onClick={handleBack}>  <i className="fa fa-light fa-reply-all"></i> Regresar</p>
      {loadFontAwesome()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-10 lg:px-20">
        <div className="flex flex-col justify-center p-2  h-full ">
          {/* Imagen principal grande */}
          <div className="mb-4 w-full h-[300px] ">
            <img
              src={obtenerImagenUrl()}
              alt="Imagen principal"
              className="w-full h-full object-contain sombra-png "
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
                <span className="color-one text-1xl font-bold">Multi</span>
                <span className="color-two text-1xl font-bold">laptops</span>
              </div>
              <small className=" font-semibold text-gray-900 text-lg md:text-xl">
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

          <div className=" p-2">
            {[
              "Procesador",
              // "Serie de procesador",
              "Memoria RAM",
              "Unidad de estado solido (SSD)",
              "Pantalla",
              "Gráficos",
            ].map((cualidad, index) => (
              <div key={index} className="flex items-center py-1">



                <div className="flex items-center gap-4">
                  {Object.values(producto.especificacion).map((row, i) => {
                    return row.cualidad === cualidad ? (
                      <i
                        key={i}
                        className={`fa ${row.icono_tipocualidad} w-10 h-10 rounded-full`}
                      ></i>
                    ) : null;
                  })}

                  <div className="font-medium dark:text-white">
                    <div>{cualidad}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {Object.values(producto.especificacion).map((row, i) => {
                        return row.cualidad === cualidad ? (

                          <p key={i}> {row.referencia_esp}</p>

                        ) : null;
                      })}
                    </div>
                  </div>
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
              <i className="fa fa-light fa-reply-all"></i> Regresar
            </button>


            {/* Compartir en redes sociales */}
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
              onClick={handleShareWhatsApp}
            >
              <i className="fa fa-sharp fa-regular fa-share-nodes"></i> Compartir
            </button>

          </div>

          <div className="mt-2 flex flex-col items-center">
            {isChecked ? (
              tipoMoneda == 1 ? (
                <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                  Bs{" "}
                  {(
                    (Number(producto.costo_avg) * Number(producto.factor_avg)) + precioGanacia
                  ).toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                  Bs{" "}
                  {(
                    (Number(producto.costo_avg) + precioGanacia) *
                    Number(8)
                  ).toFixed(2)}
                </span>
              )
            ) : null}
          </div>

        </div>
      </div >

      {/* Modal para la imagen ampliada */}
      < Modal
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
      </Modal >
    </>
  );
}
