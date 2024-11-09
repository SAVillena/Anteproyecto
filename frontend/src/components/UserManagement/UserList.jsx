// src/components/UserManagement/UserList.jsx

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import './UserList.css';

const UserList = ({ users, onEdit, onDelete }) => {
  // Usamos un media query para detectar dispositivos móviles
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Paper
      sx={{
        marginTop: '2rem',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: 3,
        overflowX: 'auto', // Para desplazamiento horizontal en móviles
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {/* Mostrar solo las columnas necesarias en dispositivos móviles */}
            {!isMobile && (
              <>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre de Usuario</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>RUT</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              {!isMobile && (
                <>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.rut}</TableCell>
                </>
              )}
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.Role ? user.Role.name : 'No Roles'}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {/* Iconos de acción solamente en móviles */}
                  <IconButton
                    color="warning"
                    size="small"
                    onClick={() => onEdit(user)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => onDelete(user)}
                    aria-label="Eliminar"
                  >
                    <DeleteIcon />
                  </IconButton>
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
