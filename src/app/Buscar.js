import React, { useState } from "react";
import { useProductos } from "@/context/Context";
import { useRouter } from "next/navigation";


export default function Buscar() {
    const router = useRouter();
    const { productos, isLoaded, filtrar } = useProductos()


    // Estados para cada uno de los grupos de filtros
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedProcessors, setSelectedProcessors] = useState([]);
    const [selectedRam, setSelectedRam] = useState([]);
    const [selectedScreenSize, setSelectedScreenSize] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedGraphics, setSelectedGraphics] = useState([]);


    // Función para manejar los cambios en los checkbox de cada filtro
    const handleCheckboxChange = (setState, filterGroup, value) => {
        // Determinar si el valor ya está seleccionado
        const currentIndex = filterGroup.indexOf(value);
        let newChecked = [...filterGroup];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        // Actualizar el estado correspondiente
        setState(newChecked);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        const searchCriteria = {
            selectedBrands,
            selectedProcessors,
            selectedRam,
            selectedScreenSize,
            selectedStorage,
            selectedGraphics,
        };
        /**
         * gaardar en localStorage
         */
        //localStorage.setItem('criteria', JSON.stringify(searchCriteria));
        // Aquí enviarías los criterios de búsqueda a tu lógica de filtrado
        handleSearch(searchCriteria);
        console.log('entro', searchCriteria);
        router.push('/item');
    };


    /**
     *Buscar
     */
    function handleSearch(criterios) {

        const filtrado = productos.filter(producto => {
            // Filtrar por marca
            if (criterios.selectedBrands.length > 0 && !criterios.selectedBrands.includes(producto.nombre_marca)) {
                return false;
            }

            // Filtrar por procesador
            let procesadorValido = criterios.selectedProcessors.length === 0 || Object.values(producto.especificacion).some(especificacion => {
                return especificacion.cualidad === "Procesador" && criterios.selectedProcessors.some(proc => especificacion.referencia_esp.includes(proc));
            });
            if (!procesadorValido) return false;

            // Filtrar por memoria RAM
            let ramValida = criterios.selectedRam.length === 0 || Object.values(producto.especificacion).some(especificacion => {
                return especificacion.cualidad === "Memoria RAM" && criterios.selectedRam.some(ram => especificacion.referencia_esp.includes(ram));
            });
            if (!ramValida) return false;

            // ... (puedes agregar más filtros para tamaño de pantalla, almacenamiento, etc.)
            // Filtrar por tamaño de pantalla
            let pantallaValida = criterios.selectedScreenSize.length === 0 || Object.values(producto.especificacion).some(especificacion => {
                return especificacion.cualidad === "Pantalla" && criterios.selectedScreenSize.some(size => especificacion.referencia_esp.includes(size));
            });
            if (!pantallaValida) return false;

            // Filtrar por unidad de estado sólido (SSD)
            let ssdValido = criterios.selectedStorage.length === 0 || Object.values(producto.especificacion).some(especificacion => {
                return especificacion.cualidad === "Unidad de estado solido (SSD)" && criterios.selectedStorage.some(ssd => especificacion.referencia_esp.includes(ssd));
            });
            if (!ssdValido) return false;

            // Filtrar por gráficos
            let graficosValidos = criterios.selectedGraphics.length === 0 || Object.values(producto.especificacion).some(especificacion => {
                return especificacion.cualidad === "Gráficos" && criterios.selectedGraphics.some(graphics => especificacion.referencia_esp.includes(graphics));
            });
            if (!graficosValidos) return false;


            return true;
        });
        filtrar(filtrado)
        console.log(filtrado)
        return filtrado
    }

    return (




        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto my-8">
            <div className="flex justify-center mt-6">
                <p className="text-2xl font-bold text-gray-900 sm:text-3xl mb-3">Multilaptops</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
                {/* Filtros para marcas */}
                <div>
                    <p className="font-semibold mb-2">Marcas</p>
                    {['Hp', 'Lenovo', 'Dell', 'Asus', 'Msi', 'Acer', 'Samsung'].map((brand) => (
                        <label key={brand} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleCheckboxChange(setSelectedBrands, selectedBrands, brand)}
                            />
                            <span className="ml-2 text-gray-700">{brand}</span>
                        </label>
                    ))}
                </div>

                {/* Filtros para procesadores */}
                <div>
                    <p className="font-semibold mb-2">Procesador</p>
                    {['i3', 'i5', 'i7', 'Ryzen 3', 'Ryzen 5', 'Ryzen 7'].map((processor) => (
                        <label key={processor} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedProcessors.includes(processor)}
                                onChange={() => handleCheckboxChange(setSelectedProcessors, selectedProcessors, processor)}
                            />
                            <span className="ml-2 text-gray-700">{processor}</span>
                        </label>
                    ))}
                </div>

                {/* Filtros para RAM */}
                <div>
                    <p className="font-semibold mb-2">RAM</p>
                    {['4GB', '8GB', '12GB', '16GB'].map((ram) => (
                        <label key={ram} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedRam.includes(ram)}
                                onChange={() => handleCheckboxChange(setSelectedRam, selectedRam, ram)}
                            />
                            <span className="ml-2 text-gray-700">{ram}</span>
                        </label>
                    ))}
                </div>

                {/* Filtros para tamaño de pantalla */}
                <div>
                    <p className="font-semibold mb-2">Tamaño Pantalla</p>
                    {['13"', '14"', '15"', '17"'].map((size) => (
                        <label key={size} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedScreenSize.includes(size)}
                                onChange={() => handleCheckboxChange(setSelectedScreenSize, selectedScreenSize, size)}
                            />
                            <span className="ml-2 text-gray-700">{size}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Filtros para almacenamiento */}
                <div>
                    <p className="font-semibold mb-2">Almacenamiento</p>
                    {['128GB', '256GB', '512GB', '1TB'].map((storage) => (
                        <label key={storage} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedStorage.includes(storage)}
                                onChange={() => handleCheckboxChange(setSelectedStorage, selectedStorage, storage)}
                            />
                            <span className="ml-2 text-gray-700">{storage}</span>
                        </label>
                    ))}
                </div>

                {/* Filtros para gráficos */}
                <div>
                    <p className="font-semibold mb-2">Gráficos</p>
                    {['Intel® UHD Graphics', 'Intel® Iris® Plus', 'AMD Radeon™ Graphics', 'Nvidia® GeForce®', 'Nvidia® GeForce® GTX™', 'Nvidia® GeForce® RTX™'].map((graphics) => (
                        <label key={graphics} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedGraphics.includes(graphics)}
                                onChange={() => handleCheckboxChange(setSelectedGraphics, selectedGraphics, graphics)}
                            />
                            <span className="ml-2 text-gray-700">{graphics}</span>
                        </label>
                    ))}
                </div>

                <div>
                    {/* Botón de búsqueda */}

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-opacity-75"
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>


        </form>




    );
}



