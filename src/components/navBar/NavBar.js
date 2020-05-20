import React, { useContext } from 'react';
import { NavContext } from './NavBarContextProvider';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { STYLE } from '../../index.style';
import clsx from 'clsx';

const useStyles = STYLE;

const NavBar = (props) => {
    const { toggleDrawer, isOpenDrawer } = useContext(NavContext);
    const classes = useStyles();

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, isOpenDrawer() && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleDrawer()}
              className={clsx(classes.menuButton, isOpenDrawer() && classes.menuButtonHidden)}
              >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Inicio
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
    )
}

export default NavBar
