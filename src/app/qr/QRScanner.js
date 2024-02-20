import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { loadFontAwesome } from "@/app/services/fontawesome";
import { useRouter } from "next/navigation";

const QRScanner = () => {
    const router = useRouter();
    const videoRef = useRef(null);
    const [scanResult, setScanResult] = useState('');

    useEffect(() => {
        const startVideo = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                scanQRCode();
            }
        };

        const scanQRCode = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const checkQRCode = () => {
                if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                    canvas.height = videoRef.current.videoHeight;
                    canvas.width = videoRef.current.videoWidth;
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {

                        setScanResult(code.data);
                        // Detener el flujo de video después de escanear el código
                        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                        // redireccionar al qr

                        router.push(code.data);
                    } else {
                        requestAnimationFrame(checkQRCode);
                    }
                } else {
                    requestAnimationFrame(checkQRCode);
                }
            };

            checkQRCode();
        };

        startVideo();

        return () => {
            // Limpieza: detener el flujo de video cuando el componente se desmonte
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            {loadFontAwesome()}
            <video ref={videoRef} style={{ width: '100%' }}></video>
            {scanResult && <p>Resultado: {scanResult}</p>}

            <button
                className="h-10 px-6 m-5 font-semibold rounded-md bg-black text-white"
                type="button"
                onClick={() => {
                    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                    router.push('/item')
                }}
            >
                <i className="fa fa-light fa-reply-all"></i> Regresar
            </button>
        </div>
    );
};

export default QRScanner;
