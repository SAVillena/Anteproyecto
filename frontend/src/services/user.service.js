import axios from './root.service';

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  try {
    const response = await axios.post('/users', user);
    const { status, data } = response;
    if (status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`/users/${id}`, user);
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
