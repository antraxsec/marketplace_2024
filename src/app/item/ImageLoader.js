import React, { useEffect, useState } from 'react';

const ImageLoader = ({ src, alt, className }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imagenCargada, setImagenCargada] = useState(false);
    const placeholderStyle = {
        width: '100%', // Asume el ancho completo del contenedor
        height: '50vh', // Puedes ajustar esta altura según el tamaño típico de tus imágenes
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '' // Un color de fondo neutro
    };
    useEffect(() => {
        // Precarga la imagen en segundo plano
        const imagen = new Image();
        imagen.onload = () => {
            setImageLoaded(true);
        };
        imagen.src = src;
    }, [src]);
    return (
        <div>
            {!imageLoaded && (
                <div className="loader" style={placeholderStyle}>Cargando...</div>
            )}
            <img
                src={src}
                alt={alt}
                className={className}
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
            />
        </div>
    );
};

export default ImageLoader;



