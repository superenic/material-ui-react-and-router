import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { STYLE } from './index.style'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './components/home/Dashboard';
import PageNotFound from './components/PageNotFound';
import findRoute from './routing'
import NavBar from './components/navBar/NavBar';
import NavDrawer from './components/NavDrawer';
import NavBarContextProvider from './components/navBar/NavBarContextProvider';
import LogIn from "./components/login/LogIn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeSession } from './redux/actions/session';

const useStyles = STYLE;

const App = ({session}) => {
  const classes = useStyles();
  const { refresh_token } = session;

  return (
    (
      refresh_token?
        <div className={classes.root}>
          <NavBarContextProvider>
          <BrowserRouter>
              <CssBaseline />
              <NavDrawer />
              <NavBar />
            <Switch>
              <Route path={findRoute('home').path} exact><Dashboard/></Route>
              <Route path="*" component={PageNotFound}></Route>
            </Switch>
          </BrowserRouter>
          </NavBarContextProvider>
        </div>
      :
        <LogIn/>
    )

  );
}

const mapProps = (state) => {
  return {
    session: state.session,
  }
};

const mapActions = (dispatch) => {
  return {
    actions: {}
  }
};

export default connect(mapProps, mapActions)(App);
