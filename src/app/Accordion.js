'use client'
import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-300">
            <button
                className="flex justify-between  w-full p-3 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <small className='font-semibold '>{title}</small>
                <span>{isOpen ? '-' : '+'}</span>
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} overflow-hidden`}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;
