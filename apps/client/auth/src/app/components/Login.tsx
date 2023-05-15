import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
// import { useStore } from '@ngneat/elf';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SignInFormType, signInFormSchema } from '../models/sign-in.model';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  const [apiError, setApiError] = useState('');
  const history = useHistory();

  const onSubmit = async (data: SignInFormType) => {
    console.log('data', data);

    const url =
      import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_URL + '/authentication/sign-in'
        : import.meta.env.VITE_PROD_API_URL + '/authentication/sign-in';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const token = await response.json();
      console.log('Login successful');

      // TODO: Handle it in a better way
      localStorage.setItem('accessToken', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);

      setApiError('');

      // redirect to home page
      history.push('/');
    } else {
      // Login failed, handle error (e.g. display error message)
      const error = await response.json();
      console.error('Login failed: ', error);
      setApiError(error.message);
    }
  };

  return (
    <Stack
      component="form"
      sx={{
        width: '23rem',
      }}
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoCapitalize="none"
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="email"
        label="email"
        focused
        {...register('email')}
      />

      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        {...register('password')}
      />

      {isSubmitting ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress style={{ height: '36.5px' }} />
        </Box>
      ) : (
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      )}

      <div style={{ height: '3rem' }}>
        {errors.email?.message || errors.password?.message || apiError ? (
          <Alert severity="error">
            {errors.email?.message || errors.password?.message || apiError}
          </Alert>
        ) : null}
      </div>

      <p className="text-center">Don't have an account?</p>
      <Button component={Link} to="/signup" color="inherit">
        Signup
      </Button>
    </Stack>
  );
};

export default Login;
