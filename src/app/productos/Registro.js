'use client'
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import { useProductos } from '@/context/Context';

const Registro = () => {
    const { setUser } = useProductos();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [celular, setCelular] = useState('');
    const [rol, setRol] = useState('usuario');
    const [error, setError] = useState('');
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);
    const [codigo, setCodigo] = useState('')

    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                // Usuario está logueado
                setUsuarioLogueado(usuario);
            } else {
                // Usuario no está logueado
                setUsuarioLogueado(null);
            }
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (codigo === 'david666') {
            setError('');

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Guarda la información adicional en Firestore
                await setDoc(doc(db, "usuarios", user.uid), {
                    email: user.email,
                    nombre: nombre,
                    celular: celular,
                    rol: rol
                });
                localStorage.setItem('user', JSON.stringify({
                    email: user.email,
                    nombre: nombre,
                    celular: celular,
                    rol: rol
                }));
                setUser({
                    email: user.email,
                    nombre: nombre,
                    celular: celular,
                    rol: rol
                })
                console.log('Usuario registrado con éxito', {
                    email: user.email,
                    nombre: nombre,
                    celular: celular,
                    rol: rol
                });
            } catch (error) {
                setError('Error en el registro: ' + error.message);
            }
        } else {
            setError('No eres Admin');
        }



    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('Sesión cerrada con éxito');
        } catch (error) {
            console.error('Error cerrando la sesión: ', error);
        }
    };

    return (
        <div className=''>
            <h1 className="text-center my-3 sm:block text-1xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#2e60de] from-sky-200">
                    Registrar
                </span>{" "}
            </h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label> */}
                    <input placeholder='Nombre' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-3'>
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label> */}
                    <input placeholder='Correo Electrónico' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-3'>
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label> */}
                    <input placeholder='Contraseña' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-3'>
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Celular</label> */}
                    <input placeholder='Celular' type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-3'>
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol:</label> */}
                    <select value={rol} onChange={(e) => setRol(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        <option value="admin">Admin</option>
                        <option value="afiliado">Afiliado</option>
                        <option value="vendedor">Vendedor</option>
                    </select>
                </div>
                <div className='mb-3'>
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Celular</label> */}
                    <input placeholder='Codigo' type="password" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' type="submit">Registrarse</button>
            </form>
            {/* {usuarioLogueado ? (
                <>
                    <p>Usuario logueado: {usuarioLogueado.email}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            ) : (
                <p>No hay usuario logueado</p>
            )} */}
        </div>
    );
};

export default Registro;
