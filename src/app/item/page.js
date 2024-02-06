// "use client"
// import { useEffect, useState } from "react";
import Splidecomponent from "./Splidecomponent";
import MultiLaptops3D from "./MultiLaptops3D";


const MainComponent = () => {
  // const [activo, setActivo] = useState(true);
  // const tiempoInactividad = 9000; // 5 segundos para ejemplo

  // useEffect(() => {
  //   // Funciones para manejar los eventos
  //   const eventos = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
  //   let timerId;

  //   // Función para resetear el estado a activo y reiniciar el timer de inactividad
  //   const resetearInactividad = () => {
  //     clearTimeout(timerId);
  //     setActivo(true);
  //     timerId = setTimeout(() => setActivo(false), tiempoInactividad);
  //   };

  //   // Agrega los listeners para los eventos
  //   eventos.forEach(event =>
  //     window.addEventListener(event, resetearInactividad)
  //   );

  //   // Inicia el timer por primera vez
  //   timerId = setTimeout(() => setActivo(false), tiempoInactividad);

  //   // Limpieza al desmontar el componente
  //   return () => {
  //     clearTimeout(timerId);
  //     eventos.forEach(event =>
  //       window.removeEventListener(event, resetearInactividad)
  //     );
  //   };
  // }, [tiempoInactividad]);
  return (
    <div className=''>
      {/* {activo ? (<Splidecomponent />) : (<MultiLaptops3D />)} */}
      <Splidecomponent />
    </div>
  );
};

export default MainComponent;

