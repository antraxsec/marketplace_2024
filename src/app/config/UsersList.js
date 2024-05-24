'use client'
import { useState, useEffect } from 'react';
import { app, db } from '../firebaseConfig'; // Assuming firebaseConfig imports Firebase app and db
import { collection, onSnapshot } from 'firebase/firestore'; // Import necessary Firestore functions

export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersCollection = collection(db, 'usuarios'); // Assuming 'usuarios' is your user collection name

        const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
            const newUsers = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Include document ID
            setUsers(newUsers);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col shadow-md overflow-y-auto p-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left px-4 py-2 font-medium text-gray-700 bg-gray-200">Nombre</th>
                        <th className="text-left px-4 py-2 font-medium text-gray-700 bg-gray-200">Email</th>
                        <th className="text-left px-4 py-2 font-medium text-gray-700 bg-gray-200">Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2">{user.nombre}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.rol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
