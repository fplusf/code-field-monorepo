import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Login from '../components/Login';
import Signup from '../components/Signup';
import styled from '@emotion/styled';

const AuthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.primaryColor};
`;

const AuthPageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthPage: React.FC = () => {
  const isLoggedIn = false;
  // useStore(authStore, (state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const testContent = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Signup
          </Button>
        </Toolbar>
        <h2>Dashboard</h2>
      </AppBar>
    );
  };

  return (
    <AuthPageContainer>
      <AuthPageContent>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">{testContent()}</Route>
        </Switch>
      </AuthPageContent>
    </AuthPageContainer>
  );
};

export default AuthPage;
