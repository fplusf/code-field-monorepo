import React, { useEffect } from 'react';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Login from '../components/Login';
import Signup from '../components/Signup';
import styled from '@emotion/styled';
import useStore from '../helpers/store';

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
  const history = useHistory();
  const store = useStore();
  const isLoggedIn = store.get('isLoggedIn');

  if (!isLoggedIn) {
    history.push('/login');
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
          <Button
            onClick={() => {
              store.set('isLoggedIn', false);
            }}
            component={Link}
            to="/"
            color="inherit"
          >
            Logout
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
          <Redirect exact from="/" to="/login" />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          {isLoggedIn && <Route path="/dashboard">{testContent()}</Route>}
        </Switch>
      </AuthPageContent>
    </AuthPageContainer>
  );
};

export default AuthPage;
