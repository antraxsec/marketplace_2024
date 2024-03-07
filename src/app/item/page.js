'use client'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebaseConfig'; //
import { useRouter } from "next/navigation";
import Splidecomponent from "./Splidecomponent";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";


const MainComponent = () => {
  const router = useRouter();
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const auth = getAuth(app); // Utiliza la instancia de la aplicación Firebase inicializada
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario está autenticado
        setActivo(true);
      } else {
        // Usuario no está autenticado
        router.push('/');
      }
    });
  }, []);

  if (!activo) {
    return <Loading />;
  }

  return (
    <div className="">

      <Splidecomponent />
    </div>
  );
};

export default MainComponent;

