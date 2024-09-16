import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/user.service';
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Alert
} from '@mui/material';

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
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Gestión de Usuarios
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            fullWidth
                            required={!!editingUserId}
                        />
                    </Grid>
                    {editingUserId && (
                        <Grid item xs={12}>
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
                                fullWidth
                                required
                            >
                                <MenuItem value="user">Usuario</MenuItem>
                                <MenuItem value="admin">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            {editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '2rem' }}>
                Lista de Usuarios
            </Typography>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre de Usuario</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>RUT</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.rut}</TableCell>
                                <TableCell>{user.Role ? user.Role.name : 'No Roles'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        size="small"
                                        onClick={() => handleEditUser(user)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default UserManagement;
