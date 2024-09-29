// UserForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    rut: '',
    password: '',
    newPassword: '',
    roles: ['user'],
  });

  useEffect(() => {
    if (user) {
      // Si hay un usuario, estamos en modo edición
      setFormData({
        username: user.username,
        email: user.email,
        rut: user.rut,
        password: '',
        newPassword: '',
        roles: [user.Role ? user.Role.name : 'user'],
      });
    } else {
      // Si no, estamos en modo creación
      setFormData({
        username: '',
        email: '',
        rut: '',
        password: '',
        newPassword: '',
        roles: ['user'],
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      setFormData({
        ...formData,
        roles: [value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (!user) {
      // En creación, no enviamos newPassword
      delete dataToSend.newPassword;
    } else if (!dataToSend.newPassword) {
      // En edición, si no se especifica newPassword, no se envía
      delete dataToSend.newPassword;
    }
    onSubmit(dataToSend);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre de usuario"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="RUT"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            {!user && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
            )}
            {user && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nueva Contraseña"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="roles"
                  value={formData.roles[0]}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="user">Usuario</MenuItem>
                  <MenuItem value="admin">Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {user ? 'Actualizar Usuario' : 'Crear Usuario'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
