// components/Navbar.js
import Buscador from '@/components/Buscador';
import React, { useState } from 'react';
import Checketdos from './administrador/Checketdos';
import Checket from './administrador/Checket';

// import { SearchIcon, BellIcon } from '@heroicons/react/outline';

const Navbar = ({ setMenuVisible }) => {
    const [searchTerm, setSearchTerm] = useState('');



    return (
        <nav className="bg-gray-100 text-white shadow-md fixed w-full   left-1/2 transform -translate-x-1/2 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between h-16 ">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="h-5 w-50" src="https://multilaptops.net/recursos/imagenes/favicon/logo_full.png" alt="Logo" />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8   items-center">
                            <button type="button" onClick={() => setMenuVisible(true)} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Filtrar</button>

                        </div>
                    </div>
                    <div className="flex items-center">
                        <form className="flex ">
                            <Buscador />
                            {/* <input
                                type="text"
                                placeholder="Search"
                                className="hidden md:block bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            /> */}

                        </form>
                        .
                        <Checket />
                        .
                        <Checketdos />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
