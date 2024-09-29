import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/user.service';
import { Container, Typography, Button, Alert } from '@mui/material';
import UserList from './UserList';
import UserForm from './UserForm';
import ConfirmDialog from '../ConfirmDialog';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError('Error al cargar los usuarios.');
    }
  };

  // Función para abrir el formulario en modo creación
  const handleCreateUser = () => {
    setEditingUser(null);
    setOpenForm(true);
  };

  // Función para abrir el formulario en modo edición
  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenForm(true);
  };

  // Función para abrir el diálogo de confirmación al eliminar
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setOpenConfirm(true);
  };

  // Función para manejar el envío del formulario (crear/editar)
  const handleFormSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      setOpenForm(false);
      fetchUsers();
    } catch (error) {
      setError('Error al guardar el usuario.');
    }
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setOpenConfirm(false);
      fetchUsers();
    } catch (error) {
      setError('Error al eliminar el usuario.');
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestión de Usuarios
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="contained" color="primary" onClick={handleCreateUser}>
        Crear Usuario
      </Button>

      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />

      {openForm && (
        <UserForm
          user={editingUser}
          onClose={() => setOpenForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {openConfirm && (
        <ConfirmDialog
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar al usuario ${userToDelete.username}?`}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Container>
  );
};

export default UserManagement;
