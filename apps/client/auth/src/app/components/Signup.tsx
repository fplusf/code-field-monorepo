import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Checkbox,
  Alert,
  FormControlLabel,
  Box,
  CircularProgress,
} from '@mui/material';
// import authStore from '../store';
// import { useStore } from '@ngneat/elf';
import { Link } from 'react-router-dom';
import { SignUpFormType, signUpformSchema } from '../models/sign-up.model';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHistory } from 'react-router-dom';

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpformSchema),
  });

  const [apiError, setApiError] = useState('');
  const history = useHistory();

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    console.log(data);

    // TODO: Remove this once we have confirmPassword & terms in BE.
    const validData = {
      username: data.username,
      email: data.email,
      password: data.password,
      firstName: 'John',
      lastName: 'Doe',
    };

    const url =
      import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_URL + '/authentication/sign-up'
        : import.meta.env.VITE_PROD_API_URL + '/authentication/sign-up';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData),
    });

    if (response.status === 201) {
      // Login successful, do something here (e.g. redirect to home page)
      console.log('Login successful: ', await response.json());
      setApiError('');
      // redirect to login page
      history.push('/login');
    } else {
      // Login failed, handle error (e.g. display error message)
      const error = await response.json();
      console.error('Login failed: ', error);
      setApiError(error.message);

      console.log('apiError', apiError);
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
      <TextField id="username" label="Username" {...register('username')} />
      <TextField id="email" label="email" type="email" {...register('email')} />
      <TextField
        id="password"
        label="Password"
        type="password"
        {...register('password')}
      />
      <TextField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="terms"
            aria-describedby="terms"
            {...register('terms')}
          />
        }
        label={
          <Link target="_blanket" to="/terms">
            I accept the Terms and Conditions
          </Link>
        }
      />

      {isSubmitting ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress style={{ height: '36.5px' }} />
        </Box>
      ) : (
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Signup
        </Button>
      )}

      <div style={{ height: '3rem' }}>
        {[
          errors.username?.message,
          errors.email?.message,
          errors.password?.message,
          errors.confirmPassword?.message,
          errors.terms?.message,
          apiError,
        ]
          .filter(Boolean)
          .map((errorMessage, index) => (
            <Alert key={index} severity="error">
              {errorMessage}
            </Alert>
          ))}
      </div>

      <p>Already have an account?</p>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
    </Stack>
  );
};

export default Signup;
