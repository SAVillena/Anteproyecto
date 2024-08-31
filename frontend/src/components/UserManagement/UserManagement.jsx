import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/user.service';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        rut: '',
        password: '',
        newPassword: '', // Nuevo campo para la nueva contraseña
        roles: ['user'],
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setError('Error al cargar los usuarios.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData };
            
            // Si no estamos editando, eliminamos `newPassword` del objeto a enviar
            if (!editingUserId) {
                delete dataToSend.newPassword;
            } else if (!dataToSend.newPassword) {
                delete dataToSend.newPassword; // También elimina si está vacío al editar
            }
    
            if (editingUserId) {
                await updateUser(editingUserId, dataToSend);
            } else {
                await createUser(dataToSend);
            }
    
            fetchUsers();
            setFormData({
                username: '',
                email: '',
                rut: '',
                password: '',
                newPassword: '', // Reinicia el campo de la nueva contraseña
                roles: ['user'],
            });
            setEditingUserId(null);
        } catch (error) {
            setError('Error al guardar el usuario.');
        }
    };
    

    const handleEditUser = (user) => {
        setFormData({
            username: user.username,
            email: user.email,
            rut: user.rut,
            password: '',
            newPassword: '', // Dejar vacío el campo para la nueva contraseña
            roles: [user.Role.name],
        });
        setEditingUserId(user.id);
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            setError('Error al eliminar el usuario.');
        }
    };

    return (
        <div className="user-management-wrapper">
            <div className="container mt-5">
                <h1 className="text-center">Gestión de Usuarios</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>RUT</label>
                        <input
                            type="text"
                            name="rut"
                            value={formData.rut}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="form-control"
                            required={!!editingUserId}
                        />
                    </div>
                    {editingUserId && (
                        <div className="form-group">
                            <label>Nueva Contraseña</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Rol</label>
                        <select
                            name="roles"
                            value={formData.roles[0]}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
                    </button>
                </form>
                <h2 className="text-center">Lista de Usuarios</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de Usuario</th>
                            <th>Email</th>
                            <th>RUT</th>
                            <th>Roles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.rut}</td>
                                <td>{user.Role ? user.Role.name : 'No Roles'}</td>
                                <td>
                                    <>
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="btn btn-warning btn-sm mr-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
