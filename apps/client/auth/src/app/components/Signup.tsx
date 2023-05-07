import React from 'react';
import { TextField, Button, Stack } from '@mui/material';
// import authStore from '../store';
// import { useStore } from '@ngneat/elf';
import { Link, Redirect } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  let isLoggedIn = false; // useStore(authStore, (state) => state.isLoggedIn);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // You can replace this with your own signup logic
    // authStore.setState({ isLoggedIn: true, username });
    isLoggedIn = true;
  };

  if (isLoggedIn) {
    // Redirect to main page if user is logged in
    return <Redirect to="/dashboard" />;
  }

  return (
    <Stack
      component="form"
      sx={{
        width: '23rem',
      }}
      spacing={2}
      onSubmit={handleSubmit}
      noValidate
      autoCapitalize="none"
      autoComplete="off"
    >
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {error && <p>{error}</p>}
      <Button type="submit" variant="contained" color="primary">
        Signup
      </Button>

      <p>Already have an account?</p>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
    </Stack>
  );
};

export default Signup;
