"use client"
import React from 'react'
import lunr from 'lunr';

export default function page() {
    var documents = [{
        "id": 1,
        "name": "Ryzen 5",
        "text": "Ryzen™ 5 7520U (velocidad base de 2,8 GHz velocidad máxima de 4.3 Ghz, Quadcore 4 núcleos físicos, 8 núcleos lógicos, 4Mb cache), Memoria RAM de 8GB a 5500Mhz DDR5, Unidad de estado solido de 256GB SSD PCIe® NVMe™ M.2, Pantalla de 15,6\" IPS LED FULLHD (1920 x 1080) con micro bordes, Gráficos Radeon™ 610M, altavoces estereo, Windows 11 Instalado, Español, Plateado"
    }, {
        "id": 2,
        "name": "React",
        "text": "Intel® Core™ I5-1135G7 (velocidad base de 2,4 GHz velocidad máxima de 4,2 Ghz, Quadcore, 4 núcleos físicos, 8 núcleos lógicos, 8 MB Intel® Smart Cache), Memoria RAM de 8GB, Unidad de estado solido PCIe® NVMe™ M.2 SSD de 512GB, 17,3\" LED FULLHD (1920x1080), NVIDIA® GeForce® MX350 (2 GB GDDR5 dedicado), Windows 11"
    }, {
        "id": 3,
        "name": "Lodash",
        "text": "Ryzen™ 7 5700U (velocidad base de 1,8 GHz velocidad máxima de 4.3GHz, Octacore 8 núcleos y 16 núcleos lógicos, 8 MB Smart Cache), Memoria RAM de 8GB a 3200Mhz, Unidad de estado sólido PCIe® NVMe™ M.2 de 512 GB, Pantalla de 14\" IPS FULLHD (1920 x 1080) con micro bordes, Gráficos Radeon™, Teclado retroiluminado, Windows 11 "
    }]

    var idx = lunr(function () {
        this.ref('id')

        this.field('text')

        documents.forEach(function (doc) {
            this.add(doc)
        }, this)
    })
    console.log(idx.search("4 nucleos ryzen 5"))
    console.log('entro')
    return (
        <div>page</div>
    )
}





//dunciona
// import api from "../../api";

// export async function getStaticPaths() {
//   const productos = await api.productos();
//   const paths = productos.map((producto) => ({
//     params: { id: producto.id_producto.toString() },
//   }));
//   return { paths, fallback: false };
// }

// export default async function page({ params: { id } }) {
//   const producto = await api.producto(id);
//   console.log("producto ", producto);
//   console.log(id);
//   return <div>page</div>;
// }
