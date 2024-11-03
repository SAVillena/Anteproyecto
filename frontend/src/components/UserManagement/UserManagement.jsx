import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/user.service';
import { Container, Typography, Button, Alert, Box } from '@mui/material';
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

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError('Error al cargar los usuarios.');
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setOpenForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenForm(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setOpenConfirm(true);
  };

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
    <Container maxWidth="md" sx={{ marginTop: '40px', padding: '24px', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '24px' }}>
        Gestión de Usuarios
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: '16px' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Crear Usuario
        </Button>
      </Box>

      <Box sx={{ marginBottom: '24px' }}>
        <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      </Box>

      {openForm && (
        <Box sx={{ padding: '16px', borderRadius: '8px', boxShadow: 2 }}>
          <UserForm
            user={editingUser}
            onClose={() => setOpenForm(false)}
            onSubmit={handleFormSubmit}
          />
        </Box>
      )}

      {openConfirm && (
        <ConfirmDialog
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar al usuario ${userToDelete?.username}?`}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Container>
  );
};

export default UserManagement;
