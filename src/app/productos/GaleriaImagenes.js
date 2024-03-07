'use client'
import React, { useEffect, useState } from 'react';
import 'photoswipe/dist/photoswipe.css';
//import 'photoswipe/dist/default-skin/default-skin.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css'; // Si estás usando PhotoSwipe v5


export default function GaleriaImagenes({ imagenes }) {
    const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenes[0]?.srcGrande || '');
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#mi-galeria',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => lightbox.destroy();
    }, []);
    return (
        <div className="space-y-4">
            <div className="w-full">
                <img src={imagenSeleccionada} alt="Imagen seleccionada" className="w-full h-auto object-cover rounded-lg " />
            </div>
            <div className="flex flex-wrap gap-2">
                {imagenes.map((imagen, index) => (
                    <a href={imagen.srcGrande} data-pswp-width="1200" data-pswp-height="900" target="_blank" key={index} className="hover:opacity-75">
                        <img key={index} src={imagen.srcPequena} alt={`Imagen ${index + 1}`} className="w-24 h-24 object-cover rounded-lg border cursor-pointer" onClick={() => setImagenSeleccionada(imagen.srcGrande)} />

                    </a>
                ))}
            </div>
        </div>
    );
}
