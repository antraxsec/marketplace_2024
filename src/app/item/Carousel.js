"use client"
import React, { useEffect, useState } from 'react';
//import 'smartphoto/css/smartphoto.min.css';

export default function Carousel({ producto }) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const length = producto.imagenes.length;
  const itemsToShow = 4;

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - itemsToShow : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - itemsToShow ? 0 : currentSlide + 1);
  };

  if (!Object.values(producto.imagenes) || Object.values(producto.imagenes).length <= 0) {
    return null;
  }

  // useEffect(() => {
  //   import('smartphoto').then(({ default: SmartPhoto }) => {
  //     new SmartPhoto(".js-smartphoto");
  //   });
  // }, []); // Asegurándose de que SmartPhoto se inicialice solo una vez.

  return (
    <div className="flex items-center justify-center">
      <button onClick={prevSlide} className="p-4   ">
        {"<"}
      </button>
      <div className="flex overflow-hidden ">
        {Object.values(producto.imagenes).map((row, index) => (
          <div
            key={index}
            className={`rounded-lg p-2 border m-1 transition-transform duration-300 ease-in-out ${index >= currentSlide && index < currentSlide + itemsToShow
              ? "block"
              : "hidden"
              }`}
          >
            <img
              src={`https://multilaptops.net/${row.ruta_img}`}
              alt={`Imagen ${index + 1}`}
              className="w-full "

            />
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="p-4">
        {">"}
      </button>


      {/* <a href="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301685/1762083459.webp" class="js-smartphoto" data-caption="bear" data-id="bear" data-group="0">
        <img src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301685/1762083459.webp" width="360" />
      </a>
      <a href="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301685/1762083459.webp" class="js-smartphoto" data-caption="camel" data-id="camel" data-group="0">
        <img src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301685/1762083459.webp" width="360" />
      </a> */}
    </div>
  );
}
