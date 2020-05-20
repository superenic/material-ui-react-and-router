import React, { useContext } from 'react'
import { STYLE } from '../index.style';
import clsx from 'clsx';
import { NavContext } from './navBar/NavBarContextProvider';
import { IconButton, Divider, List, Drawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './MainListItems';
import SecondaryListItems from './SecondaryListItems';

const useStyles = STYLE;

const NavDrawer = (props) => {
    const { isOpenDrawer, closeDrawer } = useContext(NavContext);
    const classes = useStyles();

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, ! isOpenDrawer() && classes.drawerPaperClose),
        }}
        open={isOpenDrawer()}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => closeDrawer()}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems /></List>
        <Divider />
        <List><SecondaryListItems /></List>
      </Drawer>
    )
}

export default NavDrawer
