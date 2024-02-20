
import api from '../api';
import Cuerpo from './Cuerpo';


export default async function page() {
    let productos = await api.productos()


    function printContent() {
        // Hide elements you don't want to print using JavaScript (optional)
        const elementsToHide = document.querySelectorAll('.hide-on-print');
        elementsToHide.forEach(element => element.classList.add('hidden'));

        // Trigger print dialog
        window.print();

        // Restore hidden elements (optional)
        elementsToHide.forEach(element => element.classList.remove('hidden'));
    }

    const generatePdf = () => {
        // Crear una nueva instancia de jsPDF
        const pdf = new jsPDF();

        // Agregar texto al documento
        pdf.text("¡Hola, este es tu PDF generado!", 10, 10);

        // Agregar más elementos según sea necesario
        // pdf.addImage, pdf.setFont, pdf.setLineWidth, etc.

        // Guardar el documento generado
        pdf.save('documento-generado.pdf');
    };



    return (<>
        <Cuerpo productos={productos} />

    </>
    )
}
