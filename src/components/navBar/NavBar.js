import React, { useContext, useCallback } from 'react';
import { NavContext } from './NavBarContextProvider';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { STYLE } from '../../index.style';
import * as actions from '../../context/drawerActions';
import clsx from 'clsx';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeSession } from '../../redux/actions/session';

const useStyles = STYLE;

const NavBar = ({actions}) => {
    const {closeSession} = actions;
    const { isOpenDrawer, drawerDispatch } = useContext(NavContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
    const profileMenuClick = useCallback(
      (e) => {
        e.preventDefault();
        handleMenuClose();
      },
    );
    const logOutClick = useCallback(
      (e) => {
        e.preventDefault();
        handleMenuClose();
        closeSession();
      },
    );
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={profileMenuClick}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={logOutClick}>Log out</MenuItem>
      </Menu>
    );

    return (
      <>
        <AppBar position="absolute" className={clsx(classes.appBar, isOpenDrawer && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => drawerDispatch({type: actions.TOGGLE_DRAWER})}
              className={clsx(classes.menuButton, isOpenDrawer && classes.menuButtonHidden)}
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
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </>
    )
}

const mapProps = (state) => {
  return {};
};

const mapActions = (dispatch) => {
  return {
    actions: {
      closeSession: bindActionCreators(closeSession, dispatch),
    }
  };
};

export default connect(mapProps, mapActions)(NavBar);
