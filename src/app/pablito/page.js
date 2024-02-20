"use client"
//import api from "../api";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
export default async function page() {
    // const productos = await api.productos();
    //console.log(productos);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return <div>
        <Button onClick={handleOpenModal}>Abrir Modal</Button>

        <Modal show={showModal} onClose={handleCloseModal}>
            <Modal.Header>
                <Modal.Title>Título del Modal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Contenido del modal, puede ser texto, imágenes, formularios, etc.
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleCloseModal}>Cerrar Modal</Button>
            </Modal.Footer>
        </Modal>
    </div>;
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
