'use client'
import React, { useState } from 'react'
import QrCodeScanner from './QrCodeScanner';


export default function page() {
    const [scanResult, setScanResult] = useState('');
    const [error, setError] = useState('');
    const handleScanSuccess = (result) => {
        console.log('Resultado del escaneo:', result);
        setScanResult(result.text); // Asume que el resultado tiene una propiedad 'text' con el contenido escaneado
    };

    const handleScanError = (error) => {
        console.error('Error al escanear:', error);
        setError('Error al escanear el código. Por favor, inténtalo de nuevo.');
    };
    return (
        <div>

            <h1>Scanner de Códigos QR</h1>
            <QrCodeScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError} />
            {scanResult && <p>Resultado: {scanResult}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    )
}
