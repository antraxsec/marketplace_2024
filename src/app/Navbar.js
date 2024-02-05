// components/Navbar.js
import Buscador from '@/components/Buscador';
import React, { useState } from 'react';
import Checketdos from './administrador/Checketdos';

// import { SearchIcon, BellIcon } from '@heroicons/react/outline';

const Navbar = ({ setMenuVisible }) => {
    const [searchTerm, setSearchTerm] = useState('');



    return (
        <nav className="bg-gray-100 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between h-16 ">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="h-5 w-50" src="https://multilaptops.net/recursos/imagenes/favicon/logo_full.png" alt="Logo" />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8   items-center">
                            <a onClick={() => setMenuVisible(true)} className="border-indigo-500 text-gray-500 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Filtrar</a>
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

                        <Checketdos />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
