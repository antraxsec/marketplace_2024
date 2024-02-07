import React, { useState } from 'react';

export default function Carousel({ producto, selectImage }) {
    console.log('ssssss', producto)
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

    return (
        <div className="flex items-center">

            <button onClick={prevSlide} className="p-4">
                {'<'}
            </button>
            <div className="flex overflow-hidden ">
                {Object.values(producto.imagenes).map((row, index) => (
                    <div
                        key={index}
                        className={` border m-1 transition-transform duration-300 ease-in-out ${index >= currentSlide && index < currentSlide + itemsToShow ? 'block' : 'hidden'
                            }`}
                    >
                        <img
                            src={`https://multilaptops.net/${row.ruta_img}`}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-[80px]"
                            onClick={() =>
                                selectImage(`https://multilaptops.net/${row.ruta_img}`)
                            }
                        />
                    </div>
                ))}
            </div>
            <button onClick={nextSlide} className="p-4">
                {'>'}
            </button>
        </div>
    );
}