import { useProductos } from '@/context/Context';
import React, { useEffect, useState } from 'react'

export default function Precio({ setConfiguarPrecio }) {
    const { setConfigPrecio, configPrecio } = useProductos()
    // Estados para manejar los valores de los inputs
    const [tipoPrecio, setTipoPrecio] = useState('');
    const [tc, setTc] = useState('');
    const [moneda, setMoneda] = useState('');
    const [margen, setMargen] = useState('');
    // Controlador de envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // Previene la recarga de la página
        // Aquí puedes manejar los datos del formulario, por ejemplo, imprimirlos en la consola
        console.log({ tipoPrecio, tc, moneda, margen });
        localStorage.setItem('config-precio', JSON.stringify({ tipoPrecio, tc, moneda, margen }));
        setConfigPrecio({ tipoPrecio, tc, moneda, margen })
        setConfiguarPrecio(false)
    }


    useEffect(() => {
        if (configPrecio) {
            console.log('configPrecio 1', configPrecio)
            setTipoPrecio(configPrecio.tipoPrecio)
            setTc(configPrecio.tc)
            setMoneda(configPrecio.moneda)
            setMargen(configPrecio.margen)
        } else {
            console.log('configPrecio 2', configPrecio)
        }


    }, [configPrecio])


    return (
        <form onSubmit={handleSubmit} className="...">
            <div className="absolute z-50  w-64 text-sm text-gray-800 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg m-2 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Configuracion de precio</h3>
                </div>
                <div className="px-3 py-2">
                    <div className='mb-5'>
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo precio</label>
                        <select
                            value={tipoPrecio}
                            onChange={(e) => setTipoPrecio(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            <option value="">Seleccionar tipo de precio</option>
                            <option value="fijo">Precio variable fijo</option>
                            <option value="dinamico">Precio variable dinámico</option>
                        </select>
                    </div>
                    {tipoPrecio === 'fijo' ? (
                        <div className='mb-5'>
                            <div className="mb-5">
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TC</label>
                                <input
                                    value={tc}
                                    onChange={(e) => setTc(e.target.value)}
                                    type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="TC" />
                            </div>
                        </div>
                    ) : null}

                    <div className='grid grid-cols-2 gap-1'>

                        <div className='mb-5'>
                            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">moneda</label>
                            <select
                                value={moneda}
                                onChange={(e) => setMoneda(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="">Seleccionar moneda</option>
                                <option value="dolares">Dolares</option>
                                <option value="bolivianos">Bolivianos</option>

                            </select>
                        </div>
                        <div className="mb-5">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">margen</label>
                            <input
                                value={margen}
                                onChange={(e) => setMargen(e.target.value)}
                                type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Margen" />
                        </div>
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>

                    </div>
                </div>


            </div>
        </form>
    )
}
