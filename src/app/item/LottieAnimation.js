import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';


const LottieAnimation = ({ path }) => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path, // La ruta local de la animación
        });

        return () => anim.destroy(); // Opcional: limpiar en desmontaje
    }, [path]);

    return <div ref={animationContainer} />;
};

export default LottieAnimation;
