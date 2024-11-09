// src/components/UserManagement/UserManagement.jsx

import React, { useState } from 'react';
import { Container, Typography, Button, Alert, Box, Snackbar } from '@mui/material';
import UserList from './UserList';
import UserForm from './UserForm';
import ConfirmDialog from '../ConfirmDialog';
import useUsers from '../../hooks/useUsers';
import './UserManagement.css';

const UserManagement = () => {
  const { users, error, setError, handleCreateUser, handleUpdateUser, handleDeleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const handleOpenForm = (user = null) => {
    setEditingUser(user);
    setOpenForm(true);
  };

  const showAlert = (type, message) => {
    setAlert({ open: true, type, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteUser(userToDelete.id);
      showAlert('success', 'Usuario eliminado correctamente.');
      setOpenConfirm(false);
    } catch {
      showAlert('error', 'Error al eliminar el usuario.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      let result;
      if (editingUser) {
        result = await handleUpdateUser(editingUser.id, formData);
        if (result.success) {
          showAlert('success', 'Usuario actualizado correctamente.');
        } else {
          showAlert('error', result.error); // Muestra el mensaje de error en caso de fallo
        }
      } else {
        result = await handleCreateUser(formData);
        if (result.success) {
          showAlert('success', 'Usuario creado correctamente.');
        } else {
          showAlert('error', result.error); // Muestra el mensaje de error en caso de fallo
        }
      }
      setOpenForm(false);
    } catch {
      showAlert('error', 'Error al guardar el usuario.');
    }
  };


  return (
    <Container maxWidth="md" sx={{ marginTop: '40px', padding: '24px', borderRadius: '8px', boxShadow: 3, border: '1px solid cyan' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '24px' }}>
        Gestión de Usuarios
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: '16px' }}>{error}</Alert>}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
          Crear Usuario
        </Button>
      </Box>

      <Box sx={{ marginBottom: '24px' }}>
        <UserList users={users} onEdit={handleOpenForm} onDelete={(user) => {
          setUserToDelete(user);
          setOpenConfirm(true);
        }} />
      </Box>

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
          message={`¿Estás seguro de que deseas eliminar al usuario ${userToDelete?.username}?`}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Alerta Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;
