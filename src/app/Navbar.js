
import Buscador from '@/components/Buscador';
import React, { useState } from 'react';
import Checketdos from './administrador/Checketdos';
import Checket from './administrador/Checket';
import { useRouter } from "next/navigation";
import { useProductos } from '@/context/Context';
import Link from "next/link";
import Precio from './Precio';


const Navbar = () => {
    const router = useRouter();
    const { mostrarDetalles } = useProductos()
    const [menuVisible, setMenuVisible] = useState(false);

    const [configuarPrecio, setConfiguarPrecio] = useState(false)

    return (


        <nav className="bg-white shadow-md fixed w-full transform -translate-x-1/2 left-1/2 z-40">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <div onClick={() => setConfiguarPrecio(!configuarPrecio)} className="flex items-center  ">
                    <img src="https://multilaptops.net/recursos/imagenes/favicon/ml_favicon2.png" className="h-8" alt="Logo" />
                </div>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className='flex items-center '>
                        <Buscador />
                    </div>
                    <button onClick={() => setMenuVisible(!menuVisible)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-expanded={menuVisible ? "true" : "false"}>
                        <span className="sr-only">Abrir menú principal</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
                <div className={`${menuVisible ? "flex" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
                    <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:p-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {/* Links actualizados para usar Next.js Link de manera óptima */}
                        {/* <li>
                            <Link href="/precios"><p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Precios</p></Link>
                        </li> */}
                        {/* <li>
                            <Link href="/imprimir"><p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Imprimir</p></Link>
                        </li> */}
                        {/* <li>
                            <Link href="/qr"><p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Lector QR</p></Link>
                        </li> */}
                        <li onClick={() => {
                            setMenuVisible(!menuVisible);
                            mostrarDetalles();
                        }} >
                            Filtrar
                        </li>
                        <li onClick={() => setMenuVisible(!menuVisible)} className='    '>
                            <Checket />
                        </li>

                    </ul>
                </div>
            </div>
            {configuarPrecio ? (
                <Precio setConfiguarPrecio={setConfiguarPrecio} />
            ) : null}


        </nav>

    );
};

export default Navbar;


