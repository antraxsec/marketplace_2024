'use client'
import React, { useState } from 'react';
import { loadFontAwesome } from './services/fontawesome';
import { BsCpu, BsFillProjectorFill, BsFillSdCardFill, BsDisplay } from "react-icons/bs";

const Accordion = ({ title, icono, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=" overflow-y-auto ">
            {loadFontAwesome()}
            <ul className="space-y-2 font-medium ">
                <li>

                    <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {title == 'Procesador' ? <BsCpu /> : title == 'Memoria RAM' ? <BsFillProjectorFill /> : title == 'Unidad de estado solido (SSD)' ? <BsFillSdCardFill /> : title == 'Pantalla' ? <BsDisplay /> : null}

                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                            {title === 'Unidad de estado solido (SSD)' ? 'Unidad SSD' : title === 'Generación del procesador (Intel)' ? 'Generación' : title == 'Ranuras de expansión disponibles' ? 'Expanción' : title === 'Tecnológia de video' ? 'video' : title == 'Capacidad máxima de expansión' ? 'Capacidad' : title == 'Tecnología de pantalla' ? 'Pantalla' : title == 'Serie de procesador' ? 'Serie CPU' : title == 'Velocidad de actualización' ? 'V. actualozación' : title == 'Velocidad de lectura y escritura' ? 'Lectura, Escritura' : title}
                        </span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>

                    </button>
                </li>
                <div className={`${isOpen ? 'block' : 'hidden'} overflow-hidden`}>
                    {children}
                </div>
            </ul>
        </div>
    );
};

export default Accordion;
