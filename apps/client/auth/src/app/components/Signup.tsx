import React from 'react';
import {
  TextField,
  Button,
  Stack,
  Checkbox,
  Alert,
  FormControlLabel,
} from '@mui/material';
// import authStore from '../store';
// import { useStore } from '@ngneat/elf';
import { Link } from 'react-router-dom';
import { SignUpFormType, signUpformSchema } from '../models/sign-up.model';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpformSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormType> = (data) => {
    console.log(data);
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
      <Button
        disabled={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
      >
        Signup
      </Button>
      <div style={{ height: '3rem' }}>
        {!!Object.keys(errors).length && (
          <Alert severity="error">
            {errors.username?.message ||
              errors.email?.message ||
              errors.password?.message ||
              errors.confirmPassword?.message ||
              errors.terms?.message}
          </Alert>
        )}
      </div>

      <p>Already have an account?</p>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
    </Stack>
  );
};

export default Signup;
