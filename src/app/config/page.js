'use client'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, app } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';
import { useProductos } from '@/context/Context';
import Link from 'next/link';
import UsersList from './UsersList';


export default function page() {
  const router = useRouter()
  const { user } = useProductos();
  const [data, setData] = useState({});

  const [tipoPrecio, setTipoPrecio] = useState("");
  const [tc, setTc] = useState("");
  const [moneda, setMoneda] = useState("");
  const [margen, setMargen] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("afiliado");

  const documentoId = tipoUsuario;


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Crea un objeto con los datos del formulario
    const formData = {
      tipoPrecio,
      tc,
      moneda,
      margen,
      tipoUsuario,
    };

    // Referencia al documento específico en la colección
    const docRef = doc(db, "PrecioModificable", documentoId);

    try {
      // Intenta obtener el documento
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Si el documento no existe, créalo
        await setDoc(docRef, formData);
        console.log("Documento creado con éxito");
      } else {
        // Si el documento ya existe, actualízalo
        await setDoc(docRef, formData, { merge: true });
        console.log("Documento actualizado con éxito");
      }
    } catch (e) {
      console.error("Error al crear o actualizar el documento: ", e);
      // Maneja el error aquí
    }
  };


  useEffect(() => {
    const docRef = doc(db, "PrecioModificable", documentoId);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        console.log("Datos actuales: ", doc.data());
        setData(doc.data());
        //actualizar datos
        setTipoPrecio(doc.data().tipoPrecio);
        setTc(doc.data().tc);
        setMoneda(doc.data().moneda);
        setMargen(doc.data().margen);
      } else {
        // Documento no existe
        console.log("El documento no existe!");
      }
    });

    // Limpiar suscripción al desmontar el componente
    return () => unsubscribe();
  }, [tipoUsuario]);



  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const auth = getAuth(app); // Utiliza la instancia de la aplicación Firebase inicializada
    onAuthStateChanged(auth, async (users) => {
      //console.log(users)
      if (users) {
        const docRef = doc(db, "usuarios", users.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        if (docSnap.data().rol === 'admin') {
          setActivo(true);
        } else {
          router.push('/', { scroll: false })

        }
        // Usuario está autenticado



      } else {
        // Usuario no está autenticado
        router.push('/', { scroll: false })

      }
    });
  }, [user]);



  if (!activo) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#f0fdf4] min-h-screen flex items-center justify-center">
      <div className='grid grid-cols-2 gap-4 p-5 bg-white shadow-lg rounded-lg'>



        <div className="col-span-2 md:col-span-1 px-3 py-2">

          <h2 className="text-[#166534] text-xl font-semibold mb-4">{tipoUsuario}</h2>
          <div className="bg-[#dcfce7] p-3 rounded-lg">
            <div>
              <div className="text-[#14532d]">Tipo Precio: {data.tipoPrecio}</div>
              <div className="text-[#14532d]">TC: {data.tc}</div>
              <div className="text-[#14532d]">Moneda: {data.moneda}</div>
              <div className="text-[#14532d]">Margen: {data.margen}</div>
              <div className="text-[#14532d]">Tipo Usuario: {data.tipoUsuario}</div>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-center">
              <input
                id="afiliado"
                type="radio"
                name="tipo-usuario"
                value="afiliado"
                checked={tipoUsuario === "afiliado"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Afiliado
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                id="vendedor"
                type="radio"
                name="tipo-usuario"
                value="vendedor"
                checked={tipoUsuario === "vendedor"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="w-5 h-5 mr-2 text-[#31C48D] bg-[#F3FAF7] border-[#31C48D] rounded-lg focus:ring-blue-100 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Vendedor
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tipo precio
            </label>
            <select
              value={tipoPrecio}
              onChange={(e) => setTipoPrecio(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4ade80] focus:border-[#4ade80] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4ade80] dark:focus:border-[#4ade80]"
            >
              <option value="">Seleccionar tipo de precio</option>
              <option value="fijo">Precio variable fijo</option>
              <option value="dinamico">Precio variable dinámico</option>
            </select>
          </div>
          {tipoPrecio === "fijo" ? (
            <div className="mb-5">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  TC
                </label>
                <input
                  value={tc}
                  onChange={(e) => setTc(e.target.value)}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4ade80] focus:border-[#4ade80] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4ade80] dark:focus:border-[#4ade80]"
                  placeholder="TC"
                />
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-1">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                moneda
              </label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4ade80] focus:border-[#4ade80] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4ade80] dark:focus:border-[#4ade80]"
              >
                <option value="">Seleccionar moneda</option>
                <option value="dolares">Dolares</option>
                <option value="bolivianos">Bolivianos</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                margen
              </label>
              <input
                value={margen}
                onChange={(e) => setMargen(e.target.value)}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4ade80] focus:border-[#4ade80] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4ade80] dark:focus:border-[#4ade80]"
                placeholder="Margen"
              />
            </div>
          </div>

          <div className="text-center">
            <Link
              href='/productos'
              className="text-white mx-2 bg-gray-800 hover:bg-[#22c55e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#86efac] dark:focus:ring-blue-800"
            >
              regresar
            </Link>
            <button
              type="submit"
              className="text-white bg-[#4ade80] hover:bg-[#22c55e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#86efac] dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center justify-center">
          {/* Contenido adicional aquí */}
          <div className="text-center text-[#15803d]"> Usuario Registrados
            <UsersList />
          </div>

        </div>
      </div>
    </form>
  )
}
