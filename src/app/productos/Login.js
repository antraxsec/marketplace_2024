"use client"
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { useProductos } from '@/context/Context';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';
// Asegúrate de que este es el camino correcto hacia tu archivo de configuración de Firebase.

const Login = () => {
    const router = useRouter()
    const { setUser } = useProductos();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth(app);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Intenta iniciar sesión con email y contraseña
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Intenta recuperar datos adicionales del usuario desde Firestore
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            let userData;
            if (docSnap.exists()) {
                // Si el documento existe, combina los datos de Firestore con los de autenticación
                userData = {
                    email: user.email,
                    uid: user.uid,
                    ...docSnap.data() // Incorpora los datos adicionales de Firestore
                };
            } else {
                // Si no se encuentran datos adicionales, utiliza solo los datos de autenticación
                userData = {
                    email: user.email,
                    uid: user.uid
                };
            }

            // Guarda los datos del usuario en localStorage
            console.log('Guardando usuario en localStorage', userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData)

            // Confirma que los datos se han guardado correctamente en localStorage
            console.log('Usuario guardado en localStorage:', localStorage.getItem("user"));

            // Redirección a la página de productos después de guardar los datos
            router.push('/productos', { scroll: false });

        } catch (error) {
            // Maneja errores, como credenciales incorrectas o problemas de red
            setError('Error al iniciar sesión: ' + error.message);
            console.error('Error al iniciar sesión:', error);
        }
    };

    //rediregir si esta logueado
    // const [activo, setActivo] = useState(false);

    // useEffect(() => {
    //     const auth = getAuth(app); // Utiliza la instancia de la aplicación Firebase inicializada
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // Usuario está autenticado
    //             router.push('/productos');
    //         } else {
    //             // Usuario no está autenticado

    //             setActivo(true);
    //         }
    //     });
    // }, []);

    // if (!activo) {
    //     return <Loading />;
    // }



    return (
        <div className=''>
            <h1 className="text-center my-3 sm:block text-1xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#2e60de] from-sky-200">
                    Login
                </span>{" "}
            </h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}



            <form onSubmit={handleSubmit} >
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Ingresar</button>
            </form>

        </div>
    );
};

export default Login;
