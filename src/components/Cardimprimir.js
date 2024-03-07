"use client"
import { useProductos } from "@/context/Context";
import Link from "next/link";
function Cardimprimir({ producto }) {
    console.log('card producto uno', producto)

    const { precioGanacia, isChecked } = useProductos();

    const obtenerImagenUrl = () => {
        const imagen = Object.values(producto.imagenes).find(
            (row) => row.cod_albumtipo === "5"
        );
        return imagen
            ? `https://multilaptops.net/${imagen.ruta_img}`
            : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
    };

    /**
     * para mostrar solo 4 palbras
     */
    function getFourWords(paragraph) {
        const words = paragraph.split(" ");
        const firstFourWords = words.slice(0, 4);
        return firstFourWords.join(" ");
    }

    return (
        <div className='mb-[50px]'>
            <div className=" rounded-3xl border border-gray-100 h-full p-5"> {/* shadow-sm flex flex-col items-center p-2 sm:max-w-sm h-[500px] card-hover */}

                <img
                    className="w-full h-48 object-contain sombra-png"
                    src={obtenerImagenUrl()}
                    alt="Producto"
                />

                <div className="flex flex-col justify-between flex-grow w-full ">
                    <p className="mt-1 text-lg font-bold tracking-tight text-gray-900 sm:text-xl text-left ps-2">
                        {producto.nombre_marca} {producto.nombre_linea} {producto.id_producto}
                    </p>
                    <hr className="my-5"></hr>

                    <div className="text-left w-full px-2 sm:px-10 ">

                        {/* Especificaciones del Producto */}
                        {[
                            "Procesador",
                            "Memoria RAM",
                            "Unidad de estado solido (SSD)",
                            "Pantalla",
                        ].map((cualidad, index) => (
                            <div key={index}>
                                <h6 className="text-xs sm:text-sm font-bold text-gray-900 mt-1 ">
                                    {cualidad === 'Unidad de estado solido (SSD)' ? 'estado solido (SSD)' : cualidad}

                                </h6>
                                {Object.values(producto.especificacion).map((row, i) => {
                                    return row.cualidad === cualidad ? (
                                        <p key={i} className="text-gray-700">
                                            {getFourWords(row.referencia_esp)}
                                        </p>
                                    ) : null;
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="my-5 flex flex-col items-center">
                        <div className="multilaptops-text">
                            <span className="color-one text-1xl font-bold">multi</span>
                            <span className="color-two text-1xl font-bold">laptops</span>
                        </div>
                        {/* {isChecked ? (
                            <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                                Bs{" "}
                                {(
                                    (Number(producto.costo_avg) + precioGanacia) *
                                    Number(producto.factor_avg)
                                ).toFixed(2)}
                            </span>
                        ) : null} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardimprimir;
