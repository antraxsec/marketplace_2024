import React, { useEffect, useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QrCodeScanner = ({ onScanSuccess, onScanError }) => {
    const [videoInputDevices, setVideoInputDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const videoRef = useRef(null);
    const codeReader = new BrowserMultiFormatReader();

    useEffect(() => {
        // Listar los dispositivos de entrada de video al cargar el componente
        codeReader.listVideoInputDevices().then((devices) => {
            setVideoInputDevices(devices);
            if (devices.length > 0) {
                setSelectedDeviceId(devices[0].deviceId); // Selecciona por defecto la primera cámara
            }
        }).catch(onScanError);
    }, [onScanError]);

    useEffect(() => {
        if (selectedDeviceId) {
            // Inicia el escaneo con la cámara seleccionada
            codeReader.decodeOnceFromVideoDevice(selectedDeviceId, videoRef.current).then(onScanSuccess).catch(onScanError);

            return () => {
                codeReader.reset();
            };
        }
    }, [selectedDeviceId, onScanSuccess, onScanError]);

    const handleDeviceChange = (event) => {
        // Actualiza la cámara seleccionada cuando el usuario elige una opción diferente
        setSelectedDeviceId(event.target.value);
    };

    return (
        <div>
            {videoInputDevices.length > 0 && (
                <select onChange={handleDeviceChange} value={selectedDeviceId}>
                    {videoInputDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Cámara ${device.deviceId}`}
                        </option>
                    ))}
                </select>
            )}
            <video ref={videoRef} style={{ width: '100%' }}></video>
        </div>
    );
};

export default QrCodeScanner;
