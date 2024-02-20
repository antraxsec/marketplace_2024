
import Buscador from '@/components/Buscador';
import React, { useState } from 'react';
import Checketdos from './administrador/Checketdos';
import Checket from './administrador/Checket';
import { useRouter } from "next/navigation";
import { useProductos } from '@/context/Context';
import Link from "next/link";


const Navbar = () => {
    const router = useRouter();
    const { mostrarDetalles } = useProductos()
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <nav className="bg-gray-100 text-white shadow-md fixed w-full   left-1/2 transform -translate-x-1/2 z-50 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="h-5 w-50" src="https://multilaptops.net/recursos/imagenes/favicon/logo_full.png" alt="Logo" onClick={() => router.push("/precios")} />
                        </div>
                    </div>

                </div>
                <div>
                    <Checket />
                </div>
                <div>
                    <small onClick={() => {
                        mostrarDetalles()
                    }} className='text-gray-900'>Filtrar</small>
                </div>




                <button
                    onClick={() => setMenuVisible(!menuVisible)}
                    // onMouseEnter={() => setMenuVisible(true)}
                    // onMouseLeave={() => setMenuVisible(false)}
                    data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />

                    </svg>
                </button>
                <div className={`${menuVisible ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className='flex items-center'>
                            <Link href={`/precios`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Precios</Link>

                        </li>
                        <li className='flex items-center'>
                            <Link href={`/imprimir`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">imprimir</Link>

                        </li>

                        <li className='flex items-center'>
                            <Link href={`/qr`} >
                                <i className="fa fa-qrcode text-gray-900 " aria-hidden="true"></i>
                            </Link>
                        </li>

                        <li>
                            <Buscador />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
