import { Alert, Button, Stack, TextField } from '@mui/material';
import React from 'react';
// import { useStore } from '@ngneat/elf';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SignInFormType, signInFormSchema } from '../models/sign-in.model';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = (data: SignInFormType) => {
    console.log('data', data);
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

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>

      <div style={{ height: '3rem' }}>
        {!!Object.keys(errors).length && (
          <Alert severity="error">
            {errors.email?.message || errors.password?.message}
          </Alert>
        )}
      </div>

      <p className="text-center">Don't have an account?</p>
      <Button component={Link} to="/signup" color="inherit">
        Signup
      </Button>
    </Stack>
  );
};

export default Login;
