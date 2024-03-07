'use client'
import React, { useState, useEffect } from 'react';
import { useProductos } from '@/context/Context';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebaseConfig'; //
import Link from 'next/link';

export default function Aside() {
    const { productos, filtrar, mostrarslider, setMostrarslider, isChecked, mostrarPrecio, user } = useProductos();
    const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
    const [procesadoresSeleccionados, setProcesadoresSeleccionados] = useState([]);
    const [ramSeleccionada, setRamSeleccionada] = useState([]);
    const [theme, setTheme] = useState('light')
    const auth = getAuth(app);
    const actualizarFiltro = (filtro, setFiltro, valor) => {
        if (filtro.includes(valor)) {
            setFiltro(filtro.filter((item) => item !== valor));
        } else {
            setFiltro([...filtro, valor]);
        }
    };

    useEffect(() => {
        const productosFiltrados = productos.filter((producto) => {
            const cumpleMarca =
                !marcasSeleccionadas.length ||
                marcasSeleccionadas.includes(producto.nombre_marca);
            const cumpleProcesador =
                !procesadoresSeleccionados.length ||
                procesadoresSeleccionados.some((procesador) =>
                    producto.descripcion_producto.includes(procesador)
                );
            const cumpleRam =
                !ramSeleccionada.length ||
                ramSeleccionada.some((ram) =>
                    producto.descripcion_producto.includes(ram)
                );

            return cumpleMarca && cumpleProcesador && cumpleRam;
        });

        filtrar(productosFiltrados);
    }, [
        marcasSeleccionadas,
        procesadoresSeleccionados,
        ramSeleccionada,
        productos,
    ]);

    useEffect(() => {
        if (theme == 'dark') {
            document.querySelector('html').classList.add('dark')
        } else {
            document.querySelector('html').classList.remove('dark')
        }
    }, [theme])

    const cambiarTheme = () => {
        setTheme(prevTheme => prevTheme == "light" ? "dark" : "light")
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
            await localStorage.removeItem('user');
            console.log('Sesión cerrada con éxito');
        } catch (error) {
            console.error('Error cerrando la sesión: ', error);
        }
    };


    return (
        <aside
            id="logo-sidebar"
            className={`fixed  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${mostrarslider ? '-translate-x-full' : ''} sm:translate-x-0  bg-white border-r border-gray-100  dark:bg-dark-800 dark:border-dark-700 `}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-dark-800 scrollbar">
                <ul className="space-y-2 font-medium ">
                    <li>
                        {theme == 'light' ? (
                            <a
                                onClick={cambiarTheme}
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-18v0A9 9 0 0 0 20 15h.5a9 9 0 0 1-8.5 6Z" />
                                </svg>
                                <span className="ms-3 text-gray-400">Theme</span>
                            </a>
                        ) : (
                            <a
                                onClick={cambiarTheme}
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7 7 5.7 5.7m12.8 12.8L17 17M5 12H3m18 0h-2M7 17l-1.4 1.4M18.4 5.6 17 7.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                                </svg>

                                <span className="ms-3 text-gray-400">Theme</span>
                            </a>
                        )}

                    </li>
                    <li>
                        {isChecked ? (
                            <p
                                onClick={() => mostrarPrecio()}

                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <span className="ms-3 text-gray-400">Ocultar</span>
                            </p>
                        ) : (
                            <p
                                onClick={() => mostrarPrecio()}

                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <span className="ms-3 text-gray-400">Mostrar</span>
                            </p>
                        )}


                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                className="w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 21"
                            >
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <span className="ms-3 text-gray-400">Marcas</span>
                        </a>
                        <ul
                            className=" pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownSearchButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Hp"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Hp
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Lenovo"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Lenovo
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Dell"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Dell
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Asus"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Asus
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="MSI"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        MSI
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Acer"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Acer
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Samsung"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    marcasSeleccionadas,
                                                    setMarcasSeleccionadas,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Samsung
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M20.3 3.7c.2.2.4.4.4.7.3 1.8.7 5.2-.9 6.8A75.2 75.2 0 0 1 8.6 18a1 1 0 0 1-.6-.3l-.8-.9-1-.8a1 1 0 0 1 0-1.2c1-2.2 4.8-8.9 6.6-10.6 1.6-1.6 5-1.2 6.8-1l.7.5ZM5.4 7.6l4-.4-2.7 4.5-2.8-.3a1 1 0 0 1-.6-1.7l2.1-2.1Zm11.4 7-.4 4-2 2.1a1 1 0 0 1-1.8-.6l-.4-2.8 4.6-2.7Zm.8-6.2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clipRule="evenodd" />
                            </svg>

                            <span className="ms-3 text-gray-400">Procesador</span>
                        </a>
                        <ul
                            className=" pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownSearchButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Intel® Core™ i3"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Intel® Core™ i3
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Intel® Core™ i5"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Intel® Core™ i5
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Intel® Core™ i7"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Intel® Core™ i7
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Intel® Core™ i9"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Intel® Core™ i9
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Ryzen™ 3"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        AMD Ryzen™ 3
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Ryzen™ 5"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        AMD Ryzen™ 5
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Ryzen™ 7"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        AMD Ryzen™ 7
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="Intel® Celeron®"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    procesadoresSeleccionados,
                                                    setProcesadoresSeleccionados,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        Intel® Celeron®
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 5.6c-1.4-.7-2.8-1.1-4.2-1.3l-.5 1c-1.5-.2-3-.2-4.6 0l-.5-1c-1.4.2-2.8.6-4.1 1.3a17.4 17.4 0 0 0-3 11.6 18 18 0 0 0 5 2.5c.5-.5.8-1.1 1.1-1.7l-1.7-1c.2 0 .3-.2.4-.3a11.7 11.7 0 0 0 10.2 0l.4.3-1.7.9 1 1.7c1.9-.5 3.6-1.4 5.1-2.6.4-4-.6-8.2-3-11.5ZM8.6 14.8a2 2 0 0 1-1.8-2 2 2 0 0 1 1.8-2 2 2 0 0 1 1.8 2 2 2 0 0 1-1.8 2Zm6.6 0a2 2 0 0 1-1.8-2 2 2 0 0 1 1.8-2 2 2 0 0 1 1.8 2 2 2 0 0 1-1.8 2Z" />
                            </svg>

                            <span className="ms-3 text-gray-400">Ram</span>
                        </a>
                        <ul
                            className=" pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownSearchButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="4GB"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    ramSeleccionada,
                                                    setRamSeleccionada,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        4GB
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="8GB"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    ramSeleccionada,
                                                    setRamSeleccionada,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        8GB
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="12GB"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    ramSeleccionada,
                                                    setRamSeleccionada,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        12GB
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label className="w-full ms-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        <input
                                            type="checkbox"
                                            value="16GB"
                                            onChange={(e) =>
                                                actualizarFiltro(
                                                    ramSeleccionada,
                                                    setRamSeleccionada,
                                                    e.target.value
                                                )
                                            }
                                            className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        16GB
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link

                            href="/perfil"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <span className="ms-3 text-gray-400">Perfil</span>
                        </Link>
                    </li>
                    {/* configuracio */}

                    <li>
                        <Link

                            href="/config"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M7 6c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M2 11c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clipRule="evenodd" />
                                <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                            </svg>


                            <span className="ms-3 text-gray-400">Configura</span>
                        </Link>
                    </li>

                    <li>
                        <a
                            onClick={handleLogout}
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                            </svg>

                            <span className="ms-3 text-gray-400">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
