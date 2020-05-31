import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { STYLE } from './index.style';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/home/Dashboard';
import PageNotFound from './components/PageNotFound';
import findRoute from './routing';
import NavBar from './components/navBar/NavBar';
import NavDrawer from './components/NavDrawer';
import NavBarContextProvider from './components/navBar/NavBarContextProvider';
import LogIn from './components/login/LogIn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initSessionByLocal } from './redux/actions/session';
import ExpireSession from './components/common/ExpireSession';
import ForgotPassword from './components/forgotPassword';

const App = ({ session, actions }) => {
  const classes = STYLE();
  const { refresh_token } = session;
  const { initSessionByLocal } = actions;

  useEffect(() => initSessionByLocal(), [initSessionByLocal]);

  return refresh_token ? (
    <div className={classes.root}>
      <ExpireSession />
      <NavBarContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <NavDrawer />
          <NavBar />
          <Switch>
            <Route path={findRoute('home').path} exact>
              <Dashboard />
            </Route>
            <Route path='*' component={PageNotFound}></Route>
          </Switch>
        </BrowserRouter>
      </NavBarContextProvider>
    </div>
  ) : (
    <BrowserRouter>
      <Switch>
        <Route path={findRoute('forgotPassword').path} exact>
          <ForgotPassword />
        </Route>
        <Route path='*' component={LogIn}></Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapProps = (state) => {
  return {
    session: state.session,
  };
};

const mapActions = (dispatch) => {
  return {
    actions: {
      initSessionByLocal: bindActionCreators(initSessionByLocal, dispatch),
    },
  };
};

export default connect(mapProps, mapActions)(App);
