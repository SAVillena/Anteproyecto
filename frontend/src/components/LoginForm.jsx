import React from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service'; 

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/home');
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          {...register('email', {
            required: 'El correo electrónico es requerido',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'El correo electrónico no es válido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            color: theme.palette.getContrastText(
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main
            ),
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.primary.dark,
            },
          }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
