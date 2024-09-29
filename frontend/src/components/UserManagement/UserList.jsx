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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <Paper style={{ marginTop: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
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
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rut}</TableCell>
              <TableCell>{user.Role ? user.Role.name : 'No Roles'}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => onEdit(user)}
                  startIcon={<EditIcon />}
                  style={{ marginRight: '8px' }}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserList;
