import React from 'react';
import { TextField, Button, css, Stack } from '@mui/material';
// import { useStore } from '@ngneat/elf';
import { Link, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

const styles = css`
  .TextField {
    color: red;
    width: 300px;
    background-color: pink;
  }
  .MuiInputBase-input {
    background-color: lightgray;
    color: black;
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // let isLoggedIn = false;
  // useStore(authStore, (state) => state.isLoggedIn);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // authStore.setState({ isLoggedIn: true, username });
    // isLoggedIn = true;
    console.log('login', { username, password });
    // navgate to dashboard page
    return <Redirect to="/dashboard" />;
  };

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
        fullWidth
        id="username"
        label="Username"
        focused
        value={username}
        onChange={handleUsernameChange}
      />

      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>

      <p className="text-center">Don't have an account?</p>
      <Button component={Link} to="/signup" color="inherit">
        Signup
      </Button>
    </Stack>
  );
};

export default Login;
