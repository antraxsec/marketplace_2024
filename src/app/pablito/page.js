import React from 'react'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function page() {

    return (
        <div>
            hola
            <a href="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301591/7129068354.webp" data-fancybox="gallery" data-caption="Caption #1">
                <img src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301591/7129068354.webp" />
            </a>

            <a href="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301721/6230189457.webp" data-fancybox="gallery" data-caption="Caption #2">
                <img src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301721/6230189457.webp" />
            </a>
        </div>
    )
}
