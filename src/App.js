import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { STYLE } from './index.style'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './components/home/Dashboard';
import PageNotFound from './components/PageNotFound';
import findRoute from './routing'
import NavBar from './components/navBar/NavBar';
import NavDrawer from './components/NavDrawer';
import NavBarContextProvider from './components/navBar/NavBarContextProvider';

const useStyles = STYLE;

export default function App() {
  const classes = useStyles();

  return (
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
  );
}
