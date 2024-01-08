import Splidecomponent from "./Splidecomponent";

//Asegúrate de que este es el camino correcto a tu componente Card
const fetchProducto = () => {
  return fetch(
    "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G"
  ).then((res) => res.json());
};
const MainComponent = async () => {
  const productos = await fetchProducto();
  //console.log(productos.datos);

  return (
    <div>
      <Splidecomponent productos={Object.values(productos.datos)} />
    </div>
  );
};

export default MainComponent;
