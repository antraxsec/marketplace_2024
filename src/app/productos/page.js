'use client'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebaseConfig'; //
import Nav from './Nav';
import Aside from './Aside';
import Secctions from './Secctions';
import Footer from './Footer';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation'


export default function page() {
  const router = useRouter()
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const auth = getAuth(app); // Utiliza la instancia de la aplicación Firebase inicializada
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario está autenticado
        setActivo(true);
      } else {
        // Usuario no está autenticado
        router.push('/', { scroll: false })
      }
    });
  }, []);

  if (!activo) {
    return <Loading />;
  }
  return (
    <div className="">
      <Nav />
      <Aside />
      <Secctions />
      <Footer />
    </div>
  );
}





{/* <div class="container mx-auto px-4 bg-gray-100">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="w-full max-w-sm bg-white  border border-gray-200 rounded-lg m-4">
            <div class="flex flex-col items-center p-4 ">
                <img class="border rounded-lg" src="https://multilaptops.net/recursos/imagenes/productos/ecommerce/301571/2708345196.webp" alt="Bonnie image" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>

            </div>
        </div>
    </div>
</div> */}