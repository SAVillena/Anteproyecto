// UserList.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        marginTop: '2rem',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: 3, // Agrega sombra al componente
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Nombre de Usuario</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>RUT</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Roles</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rut}</TableCell>
              <TableCell>{user.Role ? user.Role.name : 'No Roles'}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => onEdit(user)}
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(user)}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserList;
