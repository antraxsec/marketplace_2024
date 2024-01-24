"use client"
// components/ProductTable.js
import React, { useEffect, useState } from 'react';
import Input from './Input';
import Checket from './Checket';
import { push } from 'next-pwa/cache';
import { useProductos } from '@/context/Context';

const ProductTable = ({ products, verPrecio, preciosG }) => {

    const [precio, setPrecio] = useState(30)
    const [isChecked, setIsChecked] = useState(true);

    const [datosNuevos, setDatosNuevos] = useState([]);



    const guardarDatos = (data) => {
        const existingObject = datosNuevos.find((obj) => obj.sku === data.sku);

        if (!existingObject) {
            datosNuevos.push(data);
        } else {
            Object.assign(existingObject, data);
        }
        setDatosNuevos(datosNuevos);
        console.log(datosNuevos);
    };

    const handleSubmit = () => {

        preciosG(precio)

        // products.map((row) => {
        //     const existingObject = datosNuevos.find((obj) => obj.sku === row.id_producto);
        //     if (!existingObject) {
        //         datosNuevos.push({ sku: row.id_producto, precioDos: (Number(row.costo_avg) + Number(precio)) * Number(row.factor_avg) });
        //     } else {
        //         Object.assign(existingObject, { sku: row.id_producto, precioDos: (Number(row.costo_avg) + Number(precio)) * Number(row.factor_avg) });
        //     }

        // })
        // setDatosNuevos(datosNuevos);
        // console.log(datosNuevos);
    };

    const verChecket = () => {
        setIsChecked(!isChecked)
        verPrecio(isChecked)
        console.log(isChecked)

    }

    return (
        <div className="overflow-x-auto">

            <div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label htmlFor="someId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Establecer precio : {precio} </label>
                        <input type="Number" onChange={(e) => setPrecio(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Precio" required />
                        <button type="submit" onClick={handleSubmit}>Guardar</button>
                    </div>

                    <div>
                        <label htmlFor="someId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ocultar Precio</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={isChecked} // Bind state to checked attribute
                                onChange={verChecket} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                </div>

            </div>


            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Producto
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Marca
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Costo
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Precios
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            _Asignar_
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Total
                        </th>
                        {/* Otros encabezados de columna */}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id_producto}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <small> {product.referencia_producto}</small>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                {product.nombre_marca}<br />
                                <small>SKU:{product.id_producto}</small>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <small>{product.costo_avg}</small>   <br />
                                {product.factor_avg}
                                <hr />
                                <small>{(product.costo_avg * product.factor_avg).toFixed(2)}</small>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                {Object.values(product.precios).map((row, i) => (
                                    <small key={i}>{row.valor_precio} {row.simbolo_moneda}</small>
                                ))}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <Input guardarDatos={guardarDatos} sku={product.id_producto} />
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                {
                                    datosNuevos.map((pro) => {
                                        if (pro.sku == product.id_producto) {
                                            return <>{pro.precioUno}<br />{pro.precioDos}</>
                                        }
                                    })
                                }
                            </td>
                            {/* Otros campos de producto */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
