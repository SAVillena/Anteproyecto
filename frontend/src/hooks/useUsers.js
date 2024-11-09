// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user.service';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch {
            setError('Error al cargar los usuarios.');
        }
    };

    const handleCreateUser = async (user) => {
        try {
            const response = await createUser(user);
            await fetchUsers();
            return { success: true, data: response };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al crear el usuario';
            setError(errorMessage);  // Almacena el error para mostrarlo en el componente
            return { success: false, error: errorMessage };
        }
    };
    

    const handleUpdateUser = async (id, user) => {
        try {
            await updateUser(id, user);
            fetchUsers();
        } catch {
            setError('Error al guardar el usuario.');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch {
            setError('Error al eliminar el usuario.');
        }
    };

    return { users, error, setError, handleCreateUser, handleUpdateUser, handleDeleteUser };
};

export default useUsers;
