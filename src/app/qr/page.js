"use client"
import React from 'react';
import { loadFontAwesome } from "@/app/services/fontawesome";
import QRScanner from './QRScanner';
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            {loadFontAwesome()}
            <div>
                <h1 className="text-center">Multilaptops</h1>

                <QRScanner />


            </div>
        </div >
    );
};

export default page;
