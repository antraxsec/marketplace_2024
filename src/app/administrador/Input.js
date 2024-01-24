import React, { useState } from 'react';

export default function Input({ guardarDatos, sku }) {
    const [precionew, setPrecionew] = useState('');

    const handleChange = (e) => {
        setPrecionew(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const data = { sku, precioUno: precionew };
        guardarDatos(data);
    };

    return (
        <div>
            <input
                type="number"
                id="precionew" // Use a more descriptive ID
                value={precionew} // Bind the input value to the state
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" // Your styling classes
                placeholder="Precio"
            />
            <button type="submit" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}
