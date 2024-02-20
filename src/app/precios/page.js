"use client"
import { useProductos } from '@/context/Context'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Select from 'react-select';

export default function page() {
    const router = useRouter();
    const [precio, setPrecio] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const { setPrecioGanancia, setTipoMoneda, tipoMoneda, precioGanacia, productos, actaulizarData } = useProductos()

    const guardar = () => {
        localStorage.setItem('precio', JSON.stringify(Number(precio)));
        setPrecioGanancia(Number(precio))
        const selectedValue = selectedOption ? selectedOption.value : '';
        localStorage.setItem('tipo', JSON.stringify(Number(selectedValue)));
        setTipoMoneda(Number(selectedValue))
        alert(`Guardado con exito ${precio}- ${selectedValue}`)
        console.log('guardado')
    }

    const options = [
        { value: '1', label: 'Moneda BS' },
        { value: '2', label: 'Moneda $us' },
    ];

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };




    return (
        <div className='p-4'>
            <h4>Precio:{precioGanacia} - {tipoMoneda == 1 ? 'Moneda Bs' : 'Moneda Sus'}</h4>
            <div>
                <Select
                    className=''
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio:{precio}</label>
                <input
                    onChange={(e) => { setPrecio(e.target.value) }}
                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="monto ganancia" />
            </div>
            <button onClick={guardar} className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Establecer monto</button>
            <button onClick={() => { router.push('/item'); }} className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">regresar</button>
            <button onClick={actaulizarData} className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar data</button>

        </div>
    )
}
